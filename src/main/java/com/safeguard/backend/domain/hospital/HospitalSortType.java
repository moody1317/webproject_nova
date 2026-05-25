package com.safeguard.backend.domain.hospital;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HospitalSortType {
    DISTANCE("distance"),   // 거리순 정렬
    TREATMENT("treatment");   // 진료중(영업중) 우선 정렬

    private final String value;

    @JsonCreator
    public static HospitalSortType from(String value) {
        if (value == null || value.isBlank()) return DISTANCE;
        return HospitalSortType.valueOf(value.toUpperCase());
    }
}
