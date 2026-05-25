package com.safeguard.backend.domain.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyHospitalResponse {
    private String placeType;

    private String name;

    private String tagName;

    private String address;

    private double distance; // disdance 받는거 {hospital.distance}km 나 `${hospital.distance}km`로 수정 요청

    private String openTime;

    private String closeTime;

    private boolean isOpen;

    private double latitude;

    private double longitude;

    private String tel;
}
