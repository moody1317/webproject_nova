package com.safeguard.backend.domain.hospital.client;

import com.safeguard.backend.domain.hospital.dto.external.HospitalApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value; // 💡 스프링 패키지 임포트 필수 확인
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component // 💡 @Service는 제거하고 @Component 하나만 명확하게 남깁니다.
@RequiredArgsConstructor
public class HospitalApiClient {

    // WebClientConfig에서 생성한 hospitalWebClient 빈이 여기에 자동으로 쏙 꽂힙니다.
    private final WebClient hospitalWebClient;

    // 💡 application.properties에 작성한 오리지널 키 명칭 그대로 매핑하여 예외 방지!
    @Value("${disaster.api.hospital.service-key}")
    private String serviceKey;

    /**
     * 🏥 국립중앙의료원 공공 API로부터 인근 병원 목록을 실시간으로 조회하는 메서드
     */
    public HospitalApiResponse fetchHospitals(double latitude, double longitude) {

        // 공공데이터포털 인코딩 인증키 유실 및 인코딩 깨짐 현상을 방지하기 위해 URI 객체 직접 빌드
        URI uri = UriComponentsBuilder.fromUriString("/getHsptlMdclLcinfoInqire") // 병원 위치 정보 조회 엔드포인트
                .queryParam("serviceKey", serviceKey)
                .queryParam("WGS84_LON", longitude) // 공공 API 기준 경도 파라미터명
                .queryParam("WGS84_LAT", latitude)  // 공공 API 기준 위도 파라미터명
                .queryParam("numOfRows", 100)       // 주변 반경에 넉넉하게 걸리도록 100개 요청
                .queryParam("_type", "json")        // 💡 매우 중요: XML이 아닌 JSON으로 응답을 받기 위한 파라미터
                .build(true) // 이미 인코딩된 상태로 URI 생성 보장
                .toUri();

        try {
            // WebClient를 통해 실시간 동기(Blocking) 방식으로 공공 API 서버 호출 및 DTO 파싱
            return hospitalWebClient.get()
                    .uri(uri)
                    .retrieve()
                    .bodyToMono(HospitalApiResponse.class)
                    .block(); // 실시간 가공 비즈니스 구조 상 가동성을 위해 동기 처리
        } catch (Exception e) {
            // 외부 공공 API 서버가 장애인 경우 빈 응답 객체를 반환하여 전체 시스템 무중단 보장 (방어적 코드)
            return new HospitalApiResponse();
        }
    }
}
