package com.safeguard.backend.domain.hospital;

import com.safeguard.backend.domain.hospital.client.HospitalApiClient;
import com.safeguard.backend.domain.hospital.dto.NearbyHospitalResponse;
import com.safeguard.backend.domain.hospital.dto.external.HospitalApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalApiClient hospitalApiClient;

    public List<NearbyHospitalResponse> findNearbyHospitals(
            double latitude,
            double longitude,
            double radius,
            HospitalSortType sortType
    ) {
        List<NearbyHospitalResponse> resultHospitals = new ArrayList<>();

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        int dayOfWeek = today.getDayOfWeek().getValue(); // 1(월) ~ 7(일)

        System.out.println("[DEBUG] 병원 요청 좌표 latitude=" + latitude
                + ", longitude=" + longitude
                + ", radius=" + radius
                + ", sortType=" + sortType);

        // 종합병원
        HospitalApiResponse hospitalResponse = hospitalApiClient.fetchHospitals(latitude, longitude);

        List<HospitalApiResponse.HospitalApiItem> hospitalItems =
                extractItems(hospitalResponse);

        System.out.println("[DEBUG] 종합병원 원본 개수: " + hospitalItems.size());

        convertItems(
                resultHospitals,
                hospitalItems,
                latitude,
                longitude,
                radius,
                dayOfWeek,
                now,
                "hospital",
                "종합병원"
        );

        // 약국
        HospitalApiResponse pharmacyResponse = hospitalApiClient.fetchPharmacies(latitude, longitude);

        List<HospitalApiResponse.HospitalApiItem> pharmacyItems =
                extractItems(pharmacyResponse);

        System.out.println("[DEBUG] 약국 원본 개수: " + pharmacyItems.size());

        convertItems(
                resultHospitals,
                pharmacyItems,
                latitude,
                longitude,
                radius,
                dayOfWeek,
                now,
                "pharmacy",
                "약국"
        );

        // 병의원
        HospitalApiResponse clinicResponse = hospitalApiClient.fetchClinics(latitude, longitude);

        List<HospitalApiResponse.HospitalApiItem> clinicItems =
                extractItems(clinicResponse);

        System.out.println("[DEBUG] 병의원 원본 개수: " + clinicItems.size());

        convertItems(
                resultHospitals,
                clinicItems,
                latitude,
                longitude,
                radius,
                dayOfWeek,
                now,
                "clinic",
                "병의원"
        );

        // 보건소
        HospitalApiResponse healthCenterResponse = hospitalApiClient.fetchHealthCenters(latitude, longitude);

        List<HospitalApiResponse.HospitalApiItem> healthCenterItems =
                extractItems(healthCenterResponse);

        System.out.println("[DEBUG] 보건소 원본 개수: " + healthCenterItems.size());

        convertItems(
                resultHospitals,
                healthCenterItems,
                latitude,
                longitude,
                radius,
                dayOfWeek,
                now,
                "healthcenter",
                "보건소"
        );

        if (sortType == HospitalSortType.DISTANCE) {
            resultHospitals.sort(Comparator.comparingDouble(NearbyHospitalResponse::getDistance));
        } else if (sortType == HospitalSortType.TREATMENT) {
            resultHospitals.sort(Comparator
                    .comparing(NearbyHospitalResponse::isOpen, Comparator.reverseOrder())
                    .thenComparingDouble(NearbyHospitalResponse::getDistance));
        }

        System.out.println("[SUCCESS] 필터링 완료! 반경 " + radius + "km 내 조건 부합 의료기관 수: " + resultHospitals.size() + "개");
        return resultHospitals;
    }

    private List<HospitalApiResponse.HospitalApiItem> extractItems(HospitalApiResponse apiResponse) {
        if (apiResponse == null ||
                apiResponse.getBody() == null ||
                apiResponse.getBody().getItems() == null ||
                apiResponse.getBody().getItems().getItem() == null) {
            return Collections.emptyList();
        }
        return apiResponse.getBody().getItems().getItem();
    }

    private void convertItems(
            List<NearbyHospitalResponse> resultHospitals,
            List<HospitalApiResponse.HospitalApiItem> rawItems,
            double latitude,
            double longitude,
            double radius,
            int dayOfWeek,
            LocalTime now,
            String defaultPlaceType,
            String defaultTagName
    ) {
        for (HospitalApiResponse.HospitalApiItem item : rawItems) {
            if (item.getLat() == null || item.getLon() == null) {
                continue;
            }

            double distance = calculateDistance(latitude, longitude, item.getLat(), item.getLon());

            if (distance > radius) {
                continue;
            }

            String[] operationTime = determineOperationTime(item, dayOfWeek);
            String openTime = operationTime[0];
            String closeTime = operationTime[1];

            boolean isOpen = checkIsOpen(openTime, closeTime, now);

            String placeType = item.getDutyDivName() == null || item.getDutyDivName().isBlank()
                    ? defaultPlaceType
                    : determinePlaceType(item.getDutyDivName());

            String tagName = item.getDutyDivName() == null || item.getDutyDivName().isBlank()
                    ? defaultTagName
                    : item.getDutyDivName();

            NearbyHospitalResponse responseDto = NearbyHospitalResponse.builder()
                    .placeType(placeType)
                    .name(item.getDutyName())
                    .tagName(tagName)
                    .address(item.getDutyAddr())
                    .distance(Math.round(distance * 10.0) / 10.0)
                    .openTime(formatTime(openTime))
                    .closeTime(formatTime(closeTime))
                    .isOpen(isOpen)
                    .latitude(item.getLat())
                    .longitude(item.getLon())
                    .tel(item.getDutyTel1())
                    .build();

            resultHospitals.add(responseDto);
        }
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private String[] determineOperationTime(HospitalApiResponse.HospitalApiItem item, int dayOfWeek) {
        String open = null;
        String close = null;

        switch (dayOfWeek) {
            case 1 -> { open = item.getDutyTime1s(); close = item.getDutyTime1c(); }
            case 2 -> { open = item.getDutyTime2s(); close = item.getDutyTime2c(); }
            case 3 -> { open = item.getDutyTime3s(); close = item.getDutyTime3c(); }
            case 4 -> { open = item.getDutyTime4s(); close = item.getDutyTime4c(); }
            case 5 -> { open = item.getDutyTime5s(); close = item.getDutyTime5c(); }
            case 6 -> { open = item.getDutyTime6s(); close = item.getDutyTime6c(); }
            case 7 -> { open = item.getDutyTime7s(); close = item.getDutyTime7c(); }
        }

        if (open != null) open = open.trim();
        if (close != null) close = close.trim();

        return new String[]{open, close};
    }

    private boolean checkIsOpen(String open, String close, LocalTime now) {
        if (open == null || close == null || open.isBlank() || close.isBlank()) {
            return false;
        }

        try {
            LocalTime openTime = LocalTime.parse(open, DateTimeFormatter.ofPattern("HHmm"));
            LocalTime closeTime = LocalTime.parse(close, DateTimeFormatter.ofPattern("HHmm"));

            return !now.isBefore(openTime) && now.isBefore(closeTime);
        } catch (Exception e) {
            return false;
        }
    }

    private String determinePlaceType(String dutyDivName) {
        if (dutyDivName == null) return "hospital";

        if (dutyDivName.contains("약국")) return "pharmacy";
        if (dutyDivName.contains("보건")) return "healthcenter";
        if (dutyDivName.contains("의원")) return "clinic";
        if (dutyDivName.contains("병원")) return "hospital";

        return "hospital";
    }

    private String formatTime(String time) {
        if (time == null || time.length() != 4) return "-";

        return time.substring(0, 2) + ":" + time.substring(2, 4);
    }
}
