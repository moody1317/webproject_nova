package com.safeguard.backend.domain.shelter.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CivilDefenseShelterApiResponse {

    private Header header;

    private Integer numOfRows;
    private Integer pageNo;
    private Integer totalCount;

    private List<Item> body;

    @Getter
    @NoArgsConstructor
    public static class Header {
        private String resultMsg;
        private String resultCode;
        private String errorMsg;
    }

    @Getter
    @NoArgsConstructor
    public static class Item {

        @JsonProperty("GID")
        private String gid;

        @JsonProperty("SHLT_NM")
        private String shltNm;

        @JsonProperty("SHNT_PSBLTY_NOPE")
        private Integer shntPsbltyNope;

        @JsonProperty("ROAD_NM_ADDR")
        private String roadNmAddr;

        @JsonProperty("DADDR")
        private String daddr;

        @JsonProperty("OPN_YN")
        private String opnYn;

        @JsonProperty("LOT")
        private Double lot;

        @JsonProperty("LAT")
        private Double lat;
    }
}
