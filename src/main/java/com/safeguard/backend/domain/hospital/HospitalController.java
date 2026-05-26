package com.safeguard.backend.domain.hospital;

import com.safeguard.backend.domain.hospital.dto.NearbyHospitalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyHospitalResponse>> getNearbyHospitals(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(value = "radius", defaultValue = "3.5") double radius,
            @RequestParam(defaultValue = "distance") String sortType
    ) {
        System.out.println("[DEBUG] 병원 요청 좌표 latitude=" + latitude
                + ", longitude=" + longitude
                + ", radius=" + radius
                + ", sortType=" + sortType);

        List<NearbyHospitalResponse> responses =
                hospitalService.findNearbyHospitals(latitude, longitude, radius, HospitalSortType.from(sortType));

        return ResponseEntity.ok(responses);
    }
}
