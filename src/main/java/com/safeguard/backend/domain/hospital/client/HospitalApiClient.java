package com.safeguard.backend.domain.hospital.client;

import com.safeguard.backend.domain.hospital.dto.external.HospitalApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class HospitalApiClient {

    private final WebClient hospitalWebClient;

    @Value("${disaster.api.hospital.service-key}")
    private String serviceKey;
    public HospitalApiResponse fetchHospitals(double latitude, double longitude) {

        URI uri = UriComponentsBuilder.fromUriString("/getHsptlMdclLcinfoInqire") // 병원 위치 정보 조회 엔드포인트
                .queryParam("serviceKey", serviceKey)
                .queryParam("WGS84_LON", longitude)
                .queryParam("WGS84_LAT", latitude)
                .queryParam("numOfRows", 100)
                .queryParam("_type", "json")
                .build(true)
                .toUri();

        try {
            return hospitalWebClient.get()
                    .uri(uri)
                    .retrieve()
                    .bodyToMono(HospitalApiResponse.class)
                    .block();
        } catch (Exception e) {
            return new HospitalApiResponse();
        }
    }
}
