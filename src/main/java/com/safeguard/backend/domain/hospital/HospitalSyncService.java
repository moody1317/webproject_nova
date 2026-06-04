package com.safeguard.backend.domain.hospital;

import com.safeguard.backend.domain.hospital.dto.external.HospitalJsonItem;
import com.safeguard.backend.domain.hospital.mapper.HospitalMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalSyncService {

    private final HospitalMapper hospitalMapper;
    private final MongoTemplate mongoTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public int syncHospitalsFromJson() {
        try {
            ClassPathResource resource =
                    new ClassPathResource("data/all_medical_data_v2.json");

            HospitalJsonItem[] items =
                    objectMapper.readValue(resource.getInputStream(), HospitalJsonItem[].class);

            List<Hospital> hospitals = Arrays.stream(items)
                    .filter(item -> item.getLat() != null && item.getLon() != null)
                    .map(hospitalMapper::toEntity)
                    .toList();

            bulkUpsertHospitals(hospitals);

            return hospitals.size();

        } catch (Exception e) {
            throw new RuntimeException("병원 JSON 동기화 실패", e);
        }
    }

    private void bulkUpsertHospitals(List<Hospital> hospitals) {
        if (hospitals == null || hospitals.isEmpty()) {
            return;
        }

        BulkOperations bulkOps =
                mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, Hospital.class);

        for (Hospital hospital : hospitals) {
            Query query = new Query(
                    Criteria.where("hospitalKey").is(hospital.getHospitalKey())
            );

            Update update = new Update()
                    .set("hospitalKey", hospital.getHospitalKey())
                    .set("name", hospital.getName())
                    .set("address", hospital.getAddress())
                    .set("tel", hospital.getTel())
                    .set("placeType", hospital.getPlaceType())
                    .set("tagName", hospital.getTagName())
                    .set("location", hospital.getLocation())
                    .set("dutyTime1s", hospital.getDutyTime1s())
                    .set("dutyTime1c", hospital.getDutyTime1c())
                    .set("dutyTime2s", hospital.getDutyTime2s())
                    .set("dutyTime2c", hospital.getDutyTime2c())
                    .set("dutyTime3s", hospital.getDutyTime3s())
                    .set("dutyTime3c", hospital.getDutyTime3c())
                    .set("dutyTime4s", hospital.getDutyTime4s())
                    .set("dutyTime4c", hospital.getDutyTime4c())
                    .set("dutyTime5s", hospital.getDutyTime5s())
                    .set("dutyTime5c", hospital.getDutyTime5c())
                    .set("dutyTime6s", hospital.getDutyTime6s())
                    .set("dutyTime6c", hospital.getDutyTime6c())
                    .set("dutyTime7s", hospital.getDutyTime7s())
                    .set("dutyTime7c", hospital.getDutyTime7c())
                    .set("dutyTime8s", hospital.getDutyTime8s())
                    .set("dutyTime8c", hospital.getDutyTime8c())
                    .set("updatedAt", hospital.getUpdatedAt());

            bulkOps.upsert(query, update);
        }

        bulkOps.execute();
    }
}
