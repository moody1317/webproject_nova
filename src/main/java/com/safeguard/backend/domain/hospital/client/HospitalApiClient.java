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
        this.serviceKey = serviceKey.replace("\"", ""); // 혹시 모를 쌍따옴표 정제
    }

    public HospitalApiResponse fetchHospitals(double latitude, double longitude) {
        try {
            // 💡 명세서 표준 규격대로 파라미터를 정확하게 조립합니다.
            String urlString = "https://safemap.go.kr/openapi2/IF_0022"
                    + "?serviceKey=" + this.serviceKey
                    + "&pageNo=1"
                    + "&numOfRows=500"         // 주변 필터링을 위해 넉넉히 500개 호출
                    + "&returnType=json";      // 명세서에 기재된 JSON 선언 방식

            URI uri = new URI(urlString);
            System.out.println("🔗 [DEBUG] 생활안전지도 최종 요청 URI: " + uri);

            return hospitalWebClient.get()
                    .uri(uri)
                    .retrieve()
                    .bodyToMono(HospitalApiResponse.class)
                    .block();

        } catch (Exception e) {
            System.out.println("❌ [ERROR] 생활안전지도 호출 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
            return new HospitalApiResponse();
        }
    }
}
