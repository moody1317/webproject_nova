package com.safeguard.backend.domain.firstaid;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "firstaid")
@Getter @Setter
public class FirstAid {
    @Id
    private String id;
    private String name;
    private String icon;

    private List<Step> steps; // 처치법 단계 리스트
    private String warning;   // 주의 사항
    private String videoUrl;  // 영상
}

@Getter @Setter
class Step {
    private int number;
    private String title;
    private String content;
    private String stepIcon;
}
