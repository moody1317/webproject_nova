package com.safeguard.backend.domain.hospital.dto.external;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class HospitalApiResponse {

    @JsonProperty("response")
    private Response response;

    @Getter
    @NoArgsConstructor
    public static class Response {
        @JsonProperty("header")
        private Header header;

        @JsonProperty("body")
        private Body body;
    }

    @Getter
    @NoArgsConstructor
    public static class Header {
        @JsonProperty("resultCode")
        private String resultCode;
        @JsonProperty("resultMsg")
        private String resultMsg;
    }

    @Getter
    @NoArgsConstructor
    public static class Body {
        @JsonProperty("items")
        private Items items;
        @JsonProperty("numOfRows")
        private int numOfRows;
        @JsonProperty("pageNo")
        private int pageNo;
        @JsonProperty("totalCount")
        private int totalCount;
    }

    @Getter
    @NoArgsConstructor
    public static class Items {
        @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
        @JsonProperty("item")
        private List<HospitalApiItem> item;
    }

    @Getter
    @NoArgsConstructor
    public static class HospitalApiItem {
        @JsonProperty("dutyname")
        private String dutyName;    // 기관명

        @JsonProperty("dutyaddr")
        private String dutyAddr;    // 주소

        @JsonProperty("dutytel1")
        private String dutyTel1;    // 대표 전화번호

        @JsonProperty("lat")
        private Double lat;         // 위도

        @JsonProperty("lon")
        private Double lon;         // 경도

        @JsonProperty("dutydivname")
        private String dutyDivName; // 기관 분류명 (ex 종합병원, 의원, 약국)

        // 요일별 운영 시간 필드 (1=월요일 ~ 6=토요일, 7=일요일, 8=공휴일)
        @JsonProperty("dutytime1s") private String dutyTime1s; // 월요일 시작
        @JsonProperty("dutytime1c") private String dutyTime1c; // 월요일 종료
        @JsonProperty("dutytime2s") private String dutyTime2s;
        @JsonProperty("dutytime2c") private String dutyTime2c;
        @JsonProperty("dutytime3s") private String dutyTime3s;
        @JsonProperty("dutytime3c") private String dutyTime3c;
        @JsonProperty("dutytime4s") private String dutyTime4s;
        @JsonProperty("dutytime4c") private String dutyTime4c;
        @JsonProperty("dutytime5s") private String dutyTime5s;
        @JsonProperty("dutytime5c") private String dutyTime5c;
        @JsonProperty("dutytime6s") private String dutyTime6s; // 토요일 시작
        @JsonProperty("dutytime6c") private String dutyTime6c; // 토요일 종료
        @JsonProperty("dutytime7s") private String dutyTime7s; // 일요일 시작
        @JsonProperty("dutytime7c") private String dutyTime7c; // 일요일 종료
        @JsonProperty("dutytime8s") private String dutyTime8s; // 공휴일 시작
        @JsonProperty("dutytime8c") private String dutyTime8c; // 공휴일 종료
    }
}
