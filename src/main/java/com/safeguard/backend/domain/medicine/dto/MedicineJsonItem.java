package com.safeguard.backend.domain.medicine.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MedicineJsonItem {

    @JsonProperty("id")
    private Integer medicineId;

    @JsonProperty("medicineName")
    private String medicineName;

    @JsonProperty("company")
    private String company;

    @JsonProperty("symptom")
    private String symptom;

    @JsonProperty("efficacy")
    private String efficacy;

    @JsonProperty("usage")
    private String usage;

    @JsonProperty("warning")
    private String warning;

    @JsonProperty("precaution")
    private String precaution;

    @JsonProperty("interaction")
    private String interaction;

    @JsonProperty("sideEffect")
    private String sideEffect;

    @JsonProperty("storage")
    private String storage;
}
