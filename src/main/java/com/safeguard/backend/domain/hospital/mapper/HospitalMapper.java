package com.safeguard.backend.domain.hospital.mapper;

import com.safeguard.backend.domain.hospital.Hospital;
import com.safeguard.backend.domain.hospital.dto.external.HospitalJsonItem;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class HospitalMapper {

    public Hospital toEntity(HospitalJsonItem item) {

        String tagName = firstNonBlank(
                item.getDutyDivName(),
                item.getDutyDivNameLower(),
                item.getDutyDivNameEmergency()
        );

        return Hospital.builder()
                .hospitalKey(
                        item.getDutyName() + "_" + item.getDutyAddr()
                )
                .name(item.getDutyName())
                .address(item.getDutyAddr())
                .tel(item.getDutyTel1())

                .tagName(tagName)

                .placeType(convertPlaceType(tagName))

                .location(
                        new GeoJsonPoint(
                                item.getLon(),
                                item.getLat()
                        )
                )

                .dutyTime1s(item.getDutyTime1s())
                .dutyTime1c(item.getDutyTime1c())

                .dutyTime2s(item.getDutyTime2s())
                .dutyTime2c(item.getDutyTime2c())

                .dutyTime3s(item.getDutyTime3s())
                .dutyTime3c(item.getDutyTime3c())

                .dutyTime4s(item.getDutyTime4s())
                .dutyTime4c(item.getDutyTime4c())

                .dutyTime5s(item.getDutyTime5s())
                .dutyTime5c(item.getDutyTime5c())

                .dutyTime6s(item.getDutyTime6s())
                .dutyTime6c(item.getDutyTime6c())

                .dutyTime7s(item.getDutyTime7s())
                .dutyTime7c(item.getDutyTime7c())

                .dutyTime8s(item.getDutyTime8s())
                .dutyTime8c(item.getDutyTime8c())

                .updatedAt(LocalDateTime.now())
                .build();
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "";
    }

    private String convertPlaceType(String tagName) {

        if (tagName == null) {
            return "hospital";
        }

        if (tagName.contains("약국")) {
            return "pharmacy";
        }

        if (tagName.contains("보건")) {
            return "public";
        }

        if (tagName.contains("응급")) {
            return "emergency";
        }

        return "hospital";
    }
}
