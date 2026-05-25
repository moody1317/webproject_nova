package com.safeguard.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 엔드포인트에 CORS 규칙 전체 적용
                .allowedOrigins("*") // 자원 공유 허락할 Origin 지정, 모든 origin 허용 상태
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") //허용할 HTTP method를 지정
                .allowedHeaders("*")
                .maxAge(3600); // 원하는 시간만큼 캐싱
    }
}
