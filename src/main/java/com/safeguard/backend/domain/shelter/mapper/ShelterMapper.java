package com.safeguard.backend.domain.shelter.mapper;

import com.safeguard.backend.domain.shelter.Shelter;
import com.safeguard.backend.domain.shelter.ShelterType;
import com.safeguard.backend.domain.shelter.dto.external.CivilDefenseShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.TsunamiShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.EarthquakeShelterApiResponse;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ShelterMapper {

    public Shelter toTsunamiEntity(TsunamiShelterApiResponse.Item item) {

        String address = item.getRnDtlAdres() != null
                ? item.getRnDtlAdres()
                : item.getShntPlaceDtlPosition();

        return Shelter.builder()
                .shelterSn("TSUNAMI_" + item.getArcd() + "_" + item.getShntdtrSn() + "_" + item.getShntPlaceSn())
                .name(item.getShntPlaceNm())
                .roadAddress(address)
                .capacity(item.getPsblNmpr())
                .shelterType(ShelterType.TSUNAMI)
                .location(new GeoJsonPoint(item.getLo(), item.getLa()))
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public Shelter toEarthquakeEntity(EarthquakeShelterApiResponse.Item item) {
        String address = firstNonBlank(
                item.getRnDtlAdres(),
                item.getEqkAcmdfcltyAdres(),
                item.getDtlAdres()
        );

        return Shelter.builder()
                .shelterSn("EARTHQUAKE_" + item.getArcd() + "_" + item.getAcmdfcltySn())
                .name(item.getVtAcmdfcltyNm())
                .roadAddress(address)
                .capacity(item.getVtAcmdPsblNmpr())
                .shelterType(ShelterType.EARTHQUAKE_OUTDOOR)
                .location(new GeoJsonPoint(item.getLo(), item.getLa()))
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public Shelter toCivilDefenseEntity(CivilDefenseShelterApiResponse.Item item) {

        String address = firstNonBlank(
                item.getRoadNmAddr(),
                item.getDaddr()
        );

        return Shelter.builder()
                .shelterSn("CIVIL_DEFENSE_" + item.getGid())
                .name(item.getShltNm())
                .roadAddress(address)
                .capacity(item.getShntPsbltyNope())
                .shelterType(ShelterType.CIVIL_DEFENSE)
                .location(new GeoJsonPoint(item.getLot(), item.getLat()))
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }
}