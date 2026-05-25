package com.safeguard.backend.domain.firstaid;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirstAidRepository extends MongoRepository<FirstAid, String> {
}
