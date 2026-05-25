package com.safeguard.backend.domain.shelter.dto;

import com.safeguard.backend.domain.shelter.ShelterType;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyShelterResponse {
    private String id;
    private String name;
    private String roadAddress;
    private Integer capacity;
    private ShelterType shelterType;
    private double distance;

    private double latitude;  //지도 마커 표시용 위도
    private double longitude; //지도 마커 표시용 경도
}
