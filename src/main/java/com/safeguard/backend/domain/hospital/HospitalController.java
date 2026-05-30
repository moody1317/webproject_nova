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
    private final HospitalSyncService hospitalSyncService;

    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyHospitalResponse>> getNearbyHospitals(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(value = "radius", defaultValue = "3.5") double radius,
            @RequestParam(defaultValue = "distance") String sortType
    ) {
        List<NearbyHospitalResponse> responses =
                hospitalService.findNearbyHospitals(
                        latitude,
                        longitude,
                        radius,
                        HospitalSortType.from(sortType)
                );

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/sync/json")
    public ResponseEntity<String> syncHospitalsFromJson() {
        int savedCount = hospitalSyncService.syncHospitalsFromJson();

        return ResponseEntity.ok("병원/약국 데이터 저장 완료: " + savedCount + "개");
    }
}
