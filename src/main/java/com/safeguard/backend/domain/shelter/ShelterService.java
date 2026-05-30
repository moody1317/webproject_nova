package com.safeguard.backend.domain.shelter;

import com.safeguard.backend.domain.shelter.dto.NearbyShelterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.*;
import org.springframework.stereotype.Service;
import org.springframework.data.geo.GeoResult;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShelterService {
    private final ShelterRepository shelterRepository;

    public List<NearbyShelterResponse> findNearbyShelters(
            double lat,
            double lng,
            double radiusKm
    ) {
        Point point = new Point(lng, lat); //경도 위도 순으로 해야 함
        Distance distance = new Distance(radiusKm, Metrics.KILOMETERS);

        GeoResults<Shelter> results =
                shelterRepository.findByLocationNear(point, distance);

        // 결과 리스트 = GeoResult<Shelter> 형태
        return results.getContent()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private NearbyShelterResponse toResponse(GeoResult<Shelter> geoResult) {
        Shelter shelter = geoResult.getContent();

        double distanceKm = geoResult.getDistance().getValue();
        double formattedDistance = Math.round(distanceKm * 100) / 100.0;

        return NearbyShelterResponse.builder()
                .id(shelter.getId())
                .name(shelter.getName())
                .lat(shelter.getLocation().getY())
                .lng(shelter.getLocation().getX())
                .capacity(shelter.getCapacity())
                .address(shelter.getRoadAddress())
                .distance(formattedDistance) //오른쪽 탭 거리 정보
                .build();
    }
}
