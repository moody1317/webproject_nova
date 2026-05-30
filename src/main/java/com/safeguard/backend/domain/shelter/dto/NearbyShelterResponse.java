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
    private double lat;
    private double lng;
    private Integer capacity;
    private String address;
    private double distance;
}
