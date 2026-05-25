package com.safeguard.backend.domain.hospital.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient hospitalWebClient() {
        // 1. 공공데이터 대용량 응답(JSON/XML) 수용을 위한 버퍼 메모리 크기 확장 (10MB로 변경)
        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();

        // 2. 외부 공공 API 서버 지연 및 먹통 현상 방지를 위한 타임아웃 네트워크 설정 (Netty 기반)
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000) // 연결 대기 최대 5초
                .responseTimeout(Duration.ofSeconds(10))            // 응답 대기 최대 10초
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(10, TimeUnit.SECONDS))  // 읽기 타임아웃 10초
                        .addHandlerLast(new WriteTimeoutHandler(10, TimeUnit.SECONDS)) // 쓰기 타임아웃 10초
                );

        // 3. 국립중앙의료원 전국 병원/약국/응급실 기본 주소를 태운 WebClient 빌드
        return WebClient.builder()
                .baseUrl("http://apis.data.go.kr/B552657/HsptlAmdnstnService") // 공공 API 공통 엔드포인트 기본 주소
                .exchangeStrategies(exchangeStrategies)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
