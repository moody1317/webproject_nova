package com.safeguard.backend.domain.userplace;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "userplaces")
public class UserPlace {
    @Id
    private String id;

    private String userId; // 사용자별 저장 위치 구분

    private String placeName;//우리집, 학교 등등

    private String address;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
