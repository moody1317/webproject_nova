package com.safeguard.backend.domain.medicine;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MedicineController {

    private final MedicineRepository medicineRepository;
    private final MedicineSyncService medicineSyncService;

    @GetMapping
    public ResponseEntity<List<Medicine>> getMedicines() {

        return ResponseEntity.ok(
                medicineRepository.findAll()
        );
    }

    @PostMapping("/sync/json")
    public ResponseEntity<String> syncMedicinesFromJson() {

        int savedCount = medicineSyncService.syncMedicinesFromJson();

        return ResponseEntity.ok(
                "의약품 데이터 저장 완료: " + savedCount + "개"
        );
    }
}
