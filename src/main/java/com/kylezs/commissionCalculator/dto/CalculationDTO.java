package com.kylezs.commissionCalculator.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalculationDTO {

    @JsonProperty("actual")
    private int actual;

    @JsonProperty("target")
    private int target;

    @JsonProperty("motc")
    private double motc;

}
