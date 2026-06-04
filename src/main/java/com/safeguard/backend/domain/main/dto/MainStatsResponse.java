package com.safeguard.backend.domain.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MainStatsResponse {
    private long publicCount;

    private long hospitalCount;

    private long pharmacyCount;

    private long clinicCount;

    private long emergencyCount;
}
