package com.safeguard.backend.domain.medicine;

import com.safeguard.backend.domain.medicine.dto.MedicineJsonItem;
import com.safeguard.backend.domain.medicine.mapper.MedicineMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineSyncService {

    private final MedicineMapper medicineMapper;
    private final MedicineRepository medicineRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public int syncMedicinesFromJson() {

        try {
            ClassPathResource resource =
                    new ClassPathResource("data/MedicineList.json");

            MedicineJsonItem[] items =
                    objectMapper.readValue(
                            resource.getInputStream(),
                            MedicineJsonItem[].class
                    );

            List<Medicine> medicines = Arrays.stream(items)
                    .map(medicineMapper::toEntity)
                    .toList();

            medicineRepository.deleteAll();
            medicineRepository.saveAll(medicines);

            return medicines.size();

        } catch (Exception e) {
            throw new RuntimeException("의약품 JSON 동기화 실패", e);
        }
    }
}