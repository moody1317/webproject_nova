package com.safeguard.backend.domain.hospital.client;

import com.safeguard.backend.domain.hospital.dto.external.HospitalApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Component
public class HospitalApiClient {

    private final WebClient hospitalWebClient;
    private final String serviceKey;

    public HospitalApiClient(
            WebClient hospitalWebClient,
            @Value("${disaster.api.hospital.service-key}") String serviceKey) {
        this.hospitalWebClient = hospitalWebClient;
        this.serviceKey = serviceKey.replace("\"", "");
    }

    public HospitalApiResponse fetchByApiCode(String apiCode) {
        try {
            String urlString = "https://safemap.go.kr/openapi2/" + apiCode
                    + "?serviceKey=" + this.serviceKey
                    + "&pageNo=1"
                    + "&numOfRows=1000"
                    + "&returnType=json";

            URI uri = new URI(urlString);
            System.out.println("[DEBUG] 생활안전지도 최종 요청 URI: " + uri);

            return hospitalWebClient.get()
                    .uri(uri)
                    .retrieve()
                    .bodyToMono(HospitalApiResponse.class)
                    .block();

        } catch (Exception e) {
            System.out.println("[ERROR] 생활안전지도 호출 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
            return new HospitalApiResponse();
        }
    }
    public HospitalApiResponse fetchHospitals(double latitude, double longitude) {
        return fetchByApiCode("IF_0022");
    }

    public HospitalApiResponse fetchPharmacies(double latitude, double longitude) {
        return fetchByApiCode("IF_0048");
    }

    public HospitalApiResponse fetchClinics(double latitude, double longitude) {
        return fetchByApiCode("IF_0026");
    }

    public HospitalApiResponse fetchHealthCenters(double latitude, double longitude) {
        return fetchByApiCode("IF_0024");
    }
}
