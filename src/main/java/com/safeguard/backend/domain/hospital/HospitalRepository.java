package com.safeguard.backend.domain.hospital;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HospitalRepository extends MongoRepository<Hospital, String> {

    GeoResults<Hospital> findByLocationNear(
            Point point,
            Distance distance
    );
}