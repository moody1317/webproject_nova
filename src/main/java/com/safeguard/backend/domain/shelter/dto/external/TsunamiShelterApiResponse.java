package com.safeguard.backend.domain.shelter.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class TsunamiShelterApiResponse {

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
        @JsonProperty("SHNT_PLACE_SN")
        private String shntPlaceSn;

        @JsonProperty("SHNT_PLACE_NM")
        private String shntPlaceNm;

        @JsonProperty("PSBL_NMPR")
        private Integer psblNmpr;

        @JsonProperty("USE_AT")
        private String useAt;

        @JsonProperty("ARCD")
        private String arcd;

        @JsonProperty("SHNTDTR_SN")
        private String shntdtrSn;

        @JsonProperty("RN_DTL_ADRES")
        private String rnDtlAdres;

        @JsonProperty("SHNT_PLACE_DTL_POSITION")
        private String shntPlaceDtlPosition;

        @JsonProperty("LO")
        private Double lo;

        @JsonProperty("LA")
        private Double la;

    }
}
