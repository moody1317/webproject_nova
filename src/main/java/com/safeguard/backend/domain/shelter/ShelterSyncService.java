package com.safeguard.backend.domain.shelter;

import com.safeguard.backend.domain.shelter.client.ShelterApiClient;
import com.safeguard.backend.domain.shelter.dto.external.EarthquakeShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.TsunamiShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.CivilDefenseShelterApiResponse;
import com.safeguard.backend.domain.shelter.mapper.ShelterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ShelterSyncService {

    /*
    공공 API 대피소 데이터
    → MongoDB shelters 컬렉션에 저장
    → 나중에 오프라인 캐싱용 API로 제공
    */

    private final ShelterApiClient shelterApiClient;
    private final ShelterMapper shelterMapper;
    private final MongoTemplate mongoTemplate;

    public int syncTsunamiShelters() {
        TsunamiShelterApiResponse response =
                shelterApiClient.fetchTsunamiShelters(1, 1000);

        if (response == null || response.getBody() == null) {
            return 0;
        }

        List<Shelter> shelters = response.getBody().stream()
                .filter(item -> "Y".equals(item.getUseAt()))
                .filter(item -> item.getLo() != null && item.getLa() != null)
                .map(shelterMapper::toTsunamiEntity)
                .toList();

        bulkUpsertShelters(shelters);

        return shelters.size();
    }

    public int syncEarthquakeShelters() throws InterruptedException {
        int numOfRows = 300;

        EarthquakeShelterApiResponse firstResponse =
                shelterApiClient.fetchEarthquakeShelters(1, numOfRows);

        if (firstResponse == null || firstResponse.getBody() == null) {
            return 0;
        }

        int totalPages = (int) Math.ceil(
                (double) firstResponse.getTotalCount() / numOfRows
        );

        int savedTotal = 0;

        for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
            Thread.sleep(300);

            EarthquakeShelterApiResponse response =
                    shelterApiClient.fetchEarthquakeShelters(pageNo, numOfRows);

            if (response == null || response.getBody() == null) {
                continue;
            }

            List<Shelter> shelters = response.getBody().stream()
                    .filter(item -> item.getLo() != null && item.getLa() != null)
                    .map(shelterMapper::toEarthquakeEntity)
                    .toList();

            bulkUpsertShelters(shelters);
            savedTotal += shelters.size();

            System.out.println("지진옥외 " + pageNo + "/" + totalPages
                    + " 저장 완료: " + shelters.size());
        }

        return savedTotal;
    }

    public int syncCivilDefenseShelters() throws InterruptedException {
        int numOfRows = 300;

        CivilDefenseShelterApiResponse firstResponse =
                shelterApiClient.fetchCivilDefenseShelters(1, numOfRows);

        if (firstResponse == null || firstResponse.getBody() == null) {
            return 0;
        }

        int totalPages = (int) Math.ceil(
                (double) firstResponse.getTotalCount() / numOfRows
        );

        int savedTotal = 0;

        for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
            Thread.sleep(300);

            CivilDefenseShelterApiResponse response =
                    shelterApiClient.fetchCivilDefenseShelters(pageNo, numOfRows);

            if (response == null || response.getBody() == null) {
                continue;
            }

            List<Shelter> shelters = response.getBody().stream()
                    .filter(item -> item.getLot() != null && item.getLat() != null)
                    .map(shelterMapper::toCivilDefenseEntity)
                    .toList();

            bulkUpsertShelters(shelters);
            savedTotal += shelters.size();

            System.out.println("민방위 " + pageNo + "/" + totalPages
                    + " 저장 완료: " + shelters.size());
        }

        return savedTotal;
    }

    private void bulkUpsertShelters(List<Shelter> shelters) {
        if (shelters == null || shelters.isEmpty()) {
            return;
        }

        BulkOperations bulkOps =
                mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, Shelter.class);

        for (Shelter shelter : shelters) {
            Query query = new Query(
                    Criteria.where("shelterSn").is(shelter.getShelterSn())
            );

            Update update = new Update()
                    .set("shelterSn", shelter.getShelterSn())
                    .set("name", shelter.getName())
                    .set("address", shelter.getRoadAddress())
                    .set("capacity", shelter.getCapacity())
                    .set("shelterType", shelter.getShelterType())
                    .set("location", shelter.getLocation())
                    .set("updatedAt", shelter.getUpdatedAt());

            bulkOps.upsert(query, update);
        }

        bulkOps.execute();
    }
}
