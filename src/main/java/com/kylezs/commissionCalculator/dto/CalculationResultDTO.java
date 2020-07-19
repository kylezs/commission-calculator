package com.kylezs.commissionCalculator.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CalculationResultDTO {

  private double achievement;

  private double commission;
}