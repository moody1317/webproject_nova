package com.safeguard.backend.domain.medicine;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MedicineRepository extends MongoRepository<Medicine, String> {

    List<Medicine> findByMedicineNameContainingIgnoreCaseOrEfficacyContainingIgnoreCaseOrSymptomContainingIgnoreCase(
            String medicineName,
            String efficacy,
            String symptom
    );
}
