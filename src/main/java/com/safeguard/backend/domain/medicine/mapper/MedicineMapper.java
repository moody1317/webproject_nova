package com.safeguard.backend.domain.medicine.mapper;

import com.safeguard.backend.domain.medicine.Medicine;
import com.safeguard.backend.domain.medicine.dto.MedicineJsonItem;
import org.springframework.stereotype.Component;

@Component
public class MedicineMapper {

    public Medicine toEntity(MedicineJsonItem item) {

        return Medicine.builder()
                .medicineId(item.getMedicineId())
                .medicineName(item.getMedicineName())
                .company(item.getCompany())
                .symptom(item.getSymptom())
                .efficacy(item.getEfficacy())
                .usage(item.getUsage())
                .warning(item.getWarning())
                .precaution(item.getPrecaution())
                .interaction(item.getInteraction())
                .sideEffect(item.getSideEffect())
                .storage(item.getStorage())
                .build();
    }
}
