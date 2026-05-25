package com.safeguard.backend.domain.shelter;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShelterRepository extends MongoRepository<Shelter,String> {
    GeoResults<Shelter> findByLocationNear(Point point, Distance distance);
    // 위치 검색 결과와 함께 실제 계산된 거리 정보까지 묶어서 반환
}
