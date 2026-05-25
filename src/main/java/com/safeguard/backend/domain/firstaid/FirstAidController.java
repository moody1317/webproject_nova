package com.safeguard.backend.domain.firstaid;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/firstaid") // 브라우저 주소창에 입력할 경로
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FirstAidController {

    private final FirstAidRepository repository;

    public FirstAidController(FirstAidRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FirstAid> getList() {
        return repository.findAll();
    }
}
