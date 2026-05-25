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
        // 1. 공공 API 호출
        HospitalApiResponse apiResponse = hospitalApiClient.fetchHospitals(latitude, longitude);

        // NPE 방지 안전장치
        if (apiResponse == null || apiResponse.getResponse() == null ||
                apiResponse.getResponse().getBody() == null ||
                apiResponse.getResponse().getBody().getItems() == null ||
                apiResponse.getResponse().getBody().getItems().getItem() == null) {
            return Collections.emptyList();
        }

        // 💡 님이 선언하신 HospitalApiItem 구조 적용
        List<HospitalApiResponse.HospitalApiItem> rawItems = apiResponse.getResponse().getBody().getItems().getItem();
        List<NearbyHospitalResponse> resultHospitals = new ArrayList<>();

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        int dayOfWeek = today.getDayOfWeek().getValue(); // 1(월) ~ 7(일)

        for (HospitalApiResponse.HospitalApiItem item : rawItems) {

            // 💡 님의 DTO 필드명인 item.getLat(), item.getLon() 반영!
            if (item.getLat() == null || item.getLon() == null) {
                continue;
            }

            // 2. 두 좌표 간 실제 물리적 거리 연산 (Haversine 공식)
            double distance = calculateDistance(latitude, longitude, item.getLat(), item.getLon());

            // 3. 컨트롤러가 지정한 반경(기본 5.0km) 외 필터링
            if (distance > radius) {
                continue;
            }

            // 4. 실시간 영업 여부 판단을 위한 시간 추출
            String[] operationTime = determineOperationTime(item, dayOfWeek);
            String openTime = operationTime[0];
            String closeTime = operationTime[1];
            boolean isOpen = checkIsOpen(openTime, closeTime, now);

            // 5. 프론트 UI 컴포넌트용 placeType 정제
            String placeType = determinePlaceType(item.getDutyDivName());

            NearbyHospitalResponse responseDto = NearbyHospitalResponse.builder()
                    .placeType(placeType)
                    .name(item.getDutyName())          // item.getDutyName() 매핑
                    .tagName(item.getDutyDivName())    // item.getDutyDivName() 매핑
                    .address(item.getDutyAddr())       // item.getDutyAddr() 매핑
                    .distance(Math.round(distance * 10.0) / 10.0) // 소수점 첫째자리 반올림
                    .openTime(formatTime(openTime))
                    .closeTime(formatTime(closeTime))
                    .isOpen(isOpen)
                    .latitude(item.getLat())
                    .longitude(item.getLon())
                    .tel(item.getDutyTel1())           // item.getDutyTel1() 매핑
                    .build();

            resultHospitals.add(responseDto);
        }

        // 6. 프론트 탭 전환 연동 정렬 파이프라인
        if (sortType == HospitalSortType.DISTANCE) {
            resultHospitals.sort(Comparator.comparingDouble(NearbyHospitalResponse::getDistance));
        } else if (sortType == HospitalSortType.TREATMENT) {
            resultHospitals.sort(Comparator
                    .comparing(NearbyHospitalResponse::isOpen, Comparator.reverseOrder())
                    .thenComparingDouble(NearbyHospitalResponse::getDistance)); // 문 열었으면 가까운 거리순 2차 서브 정렬
        }

        return resultHospitals;
    }

    /**
     * 📐 하베사인 실제 거리 계산 공식
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371; // 지구 반지름
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * 🕐 요일별 변수 Getter 바인딩 보완
     */
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

        return new String[]{open, close};
    }

    /**
     * 🟢 HHmm 시간 포맷 기반 실시간 오픈 유무 연산
     */
    private boolean checkIsOpen(String open, String close, LocalTime now) {
        if (open == null || close == null || open.isBlank() || close.isBlank()) {
            return false;
        }
        try {
            LocalTime openTime = LocalTime.parse(open, DateTimeFormatter.ofPattern("HHmm"));
            LocalTime closeTime = LocalTime.parse(close, DateTimeFormatter.ofPattern("HHmm"));
            return (!now.isBefore(openTime)) && now.isBefore(closeTime);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 🏷️ 프론트 아이콘 분기용 텍스트 필터
     */
    private String determinePlaceType(String dutyDivName) {
        if (dutyDivName == null) return "hospital";
        if (dutyDivName.contains("약국")) return "pharmacy";
        if (dutyDivName.contains("보건")) return "healthcenter";
        if (dutyDivName.contains("의원")) return "clinic";
        return "hospital";
    }

    /**
     * 💬 시간 포맷 정제
     */
    private String formatTime(String time) {
        if (time == null || time.length() != 4) return "-";
        return time.substring(0, 2) + ":" + time.substring(2, 4);
    }
}
