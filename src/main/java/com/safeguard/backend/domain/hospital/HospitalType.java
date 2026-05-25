package com.safeguard.backend.domain.hospital;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HospitalType {
    HOSPITAL("hospital"),
    PHARMACY("pharmacy"),
    EMERGENCY("emergency"),
    CLINIC("clinic"),
    HEALTHCENTER("healthcenter");

    @JsonValue
    private final String value;
}
