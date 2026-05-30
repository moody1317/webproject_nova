package com.safeguard.backend.domain.shelter.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class EarthquakeShelterApiResponse {

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

        @JsonProperty("ACMDFCLTY_SN")
        private String acmdfcltySn;

        @JsonProperty("VT_ACMDFCLTY_NM")
        private String vtAcmdfcltyNm;

        @JsonProperty("VT_ACMD_PSBL_NMPR")
        private Integer vtAcmdPsblNmpr;

        @JsonProperty("USE_SE_CD")
        private String useSeCd;

        @JsonProperty("RN_DTL_ADRES")
        private String rnDtlAdres;

        @JsonProperty("DTL_ADRES")
        private String dtlAdres;

        @JsonProperty("EQK_ACMDFCLTY_ADRES")
        private String eqkAcmdfcltyAdres;

        @JsonProperty("ARCD")
        private String arcd;

        @JsonProperty("LO")
        private Double lo;

        @JsonProperty("LA")
        private Double la;
    }
}