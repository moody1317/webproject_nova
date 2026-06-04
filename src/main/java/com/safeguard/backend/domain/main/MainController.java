package com.safeguard.backend.domain.main;

import com.safeguard.backend.domain.hospital.HospitalRepository;
import com.safeguard.backend.domain.main.dto.MainStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final HospitalRepository hospitalRepository;

    @GetMapping("/api/main/stats")
    public MainStatsResponse getStats(){

        return MainStatsResponse.builder()
                .publicCount(hospitalRepository.countByPlaceType("public"))

                .hospitalCount(hospitalRepository.countByPlaceType("hospital"))

                .pharmacyCount(hospitalRepository.countByPlaceType("pharmacy"))

                .clinicCount(hospitalRepository.countByPlaceType("clinic"))

                .emergencyCount(hospitalRepository.countByPlaceType("emergency"))

                .build();
    }
}
