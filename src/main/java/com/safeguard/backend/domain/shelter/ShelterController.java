package com.safeguard.backend.domain.shelter;

import com.safeguard.backend.domain.shelter.dto.NearbyShelterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
@RequiredArgsConstructor
public class ShelterController {
    private final ShelterService shelterService;
    /*
      위치 기반 반경 5km 대피소 요청 API
      ex : GET /api/shelters/nearby?latitude=36.628&longitude=127.456&radius=5.0
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyShelterResponse>> getNearbyShelters(
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam(value = "radius", defaultValue = "5.0") double radius
    ) {
        List<NearbyShelterResponse> responses = shelterService.findNearbyShelters(latitude, longitude, radius);

        return ResponseEntity.ok(responses);
    }
}
