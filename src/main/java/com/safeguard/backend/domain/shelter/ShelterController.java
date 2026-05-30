package com.safeguard.backend.domain.shelter;

import com.safeguard.backend.domain.shelter.dto.NearbyShelterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
@RequiredArgsConstructor
public class ShelterController {
    private final ShelterService shelterService;
    private final ShelterSyncService shelterSyncService;

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

    @PostMapping("/sync/tsunami")
    public ResponseEntity<String> syncTsunamiShelters() {
        int savedCount = shelterSyncService.syncTsunamiShelters();

        return ResponseEntity.ok("쓰나미 대피소 저장 완료: " + savedCount + "개");
    }

    @PostMapping("/sync/earthquake")
    public ResponseEntity<String> syncEarthquakeShelters() throws InterruptedException{
        int savedCount = shelterSyncService.syncEarthquakeShelters();

        return ResponseEntity.ok("지진 옥외 대피소 저장 완료: " + savedCount + "개");
    }

    @PostMapping("/sync/civil-defense")
    public ResponseEntity<String> syncCivilDefenseShelters() throws InterruptedException {
        int savedCount = shelterSyncService.syncCivilDefenseShelters();

        return ResponseEntity.ok("민방위 대피소 저장 완료: " + savedCount + "개");
    }
}
