package com.safeguard.backend.domain.hospital.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HospitalJsonItem {

    @JsonProperty("dutyname")
    private String dutyName;

    @JsonProperty("dutyaddr")
    private String dutyAddr;

    @JsonProperty("dutytel1")
    private String dutyTel1;

    @JsonProperty("lat")
    private Double lat;

    @JsonProperty("lon")
    private Double lon;

    @JsonProperty("dutyDivName")
    private String dutyDivName;

    @JsonProperty("dutydivname")
    private String dutyDivNameLower;

    @JsonProperty("dutyDivNamee")
    private String dutyDivNameEmergency;

    @JsonProperty("dutytime1s")
    private String dutyTime1s;

    @JsonProperty("dutytime1c")
    private String dutyTime1c;

    @JsonProperty("dutytime2s")
    private String dutyTime2s;

    @JsonProperty("dutytime2c")
    private String dutyTime2c;

    @JsonProperty("dutytime3s")
    private String dutyTime3s;

    @JsonProperty("dutytime3c")
    private String dutyTime3c;

    @JsonProperty("dutytime4s")
    private String dutyTime4s;

    @JsonProperty("dutytime4c")
    private String dutyTime4c;

    @JsonProperty("dutytime5s")
    private String dutyTime5s;

    @JsonProperty("dutytime5c")
    private String dutyTime5c;

    @JsonProperty("dutytime6s")
    private String dutyTime6s;

    @JsonProperty("dutytime6c")
    private String dutyTime6c;

    @JsonProperty("dutytime7s")
    private String dutyTime7s;

    @JsonProperty("dutytime7c")
    private String dutyTime7c;

    @JsonProperty("dutytime8s")
    private String dutyTime8s;

    @JsonProperty("dutytime8c")
    private String dutyTime8c;
}
