package com.safeguard.backend.domain.medicine;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "medicines")
public class Medicine {

    @Id
    private String id;

    @Indexed(unique = true)
    private Integer medicineId;

    @TextIndexed
    private String medicineName;

    private String company;

    private String symptom;

    @TextIndexed
    private String efficacy;

    private String usage;
    private String warning;
    private String precaution;
    private String interaction;
    private String sideEffect;
    private String storage;
}