package com.kylezs.commissionCalculator.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalculationResultDTO {

  private double achievement;

  private double commission;

  public CalculationResultDTO(double achievement, double commission) {
    this.achievement = achievement;
    this.commission = commission;
    }
}