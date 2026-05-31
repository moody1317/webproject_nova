package com.safeguard.backend.domain.hospital;


import com.safeguard.backend.domain.hospital.dto.NearbyHospitalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.*;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public List<NearbyHospitalResponse> findNearbyHospitals(
            double latitude,
            double longitude,
            double radius,
            HospitalSortType sortType
    ) {
        Point point = new Point(longitude, latitude);
        Distance distance = new Distance(radius, Metrics.KILOMETERS);

        GeoResults<Hospital> results =
                hospitalRepository.findByLocationNear(point, distance);

        List<NearbyHospitalResponse> responses = results.getContent().stream()
                .map(this::toResponse)
                .toList();

        if (sortType == HospitalSortType.TREATMENT) {
            return responses.stream()
                    .sorted(Comparator
                            .comparing(NearbyHospitalResponse::isOpen, Comparator.reverseOrder())
                            .thenComparingDouble(NearbyHospitalResponse::getDistance))
                    .toList();
        }

        return responses.stream()
                .sorted(Comparator.comparingDouble(NearbyHospitalResponse::getDistance))
                .toList();
    }

    private NearbyHospitalResponse toResponse(GeoResult<Hospital> geoResult) {
        Hospital hospital = geoResult.getContent();

        String[] times = getTodayTime(hospital);
        String openTime = times[0];
        String closeTime = times[1];

        boolean isOpen = checkIsOpen(openTime, closeTime);

        double distanceKm = geoResult.getDistance().getValue();

        return NearbyHospitalResponse.builder()
                .placeType(hospital.getPlaceType())
                .name(hospital.getName())
                .tagName(hospital.getTagName())
                .address(hospital.getAddress())
                .distance(Math.round(distanceKm * 10.0) / 10.0)
                .openTime(formatTime(openTime))
                .closeTime(formatTime(closeTime))
                .isOpen(isOpen)
                .latitude(hospital.getLocation().getY())
                .longitude(hospital.getLocation().getX())
                .tel(hospital.getTel())
                .build();
    }

    private String[] getTodayTime(Hospital hospital) {
        int dayOfWeek = java.time.LocalDate.now().getDayOfWeek().getValue();

        return switch (dayOfWeek) {
            case 1 -> new String[]{hospital.getDutyTime1s(), hospital.getDutyTime1c()};
            case 2 -> new String[]{hospital.getDutyTime2s(), hospital.getDutyTime2c()};
            case 3 -> new String[]{hospital.getDutyTime3s(), hospital.getDutyTime3c()};
            case 4 -> new String[]{hospital.getDutyTime4s(), hospital.getDutyTime4c()};
            case 5 -> new String[]{hospital.getDutyTime5s(), hospital.getDutyTime5c()};
            case 6 -> new String[]{hospital.getDutyTime6s(), hospital.getDutyTime6c()};
            case 7 -> new String[]{hospital.getDutyTime7s(), hospital.getDutyTime7c()};
            default -> new String[]{null, null};
        };
    }

    private boolean checkIsOpen(String open, String close) {
        if (open == null || close == null || open.isBlank() || close.isBlank()) {
            return false;
        }

        try {
            LocalTime now = LocalTime.now(ZoneId.of("Asia/Seoul"));
            LocalTime openTime = LocalTime.parse(open, DateTimeFormatter.ofPattern("HHmm"));
            LocalTime closeTime = LocalTime.parse(close, DateTimeFormatter.ofPattern("HHmm"));

            return !now.isBefore(openTime) && now.isBefore(closeTime);
        } catch (Exception e) {
            return false;
        }
    }

    private String formatTime(String time) {
        if (time == null || time.length() != 4) return "-";

        return time.substring(0, 2) + ":" + time.substring(2, 4);
    }
}
