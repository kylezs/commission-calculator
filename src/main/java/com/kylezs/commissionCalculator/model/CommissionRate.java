package com.kylezs.commissionCalculator.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
public class CommissionRate {

    @JsonProperty("id")
    private final UUID id;

    @JsonProperty("rateName")
    private String rateName;

    // Create a range with lowerbound and upperbound
    @JsonProperty("lowerBoundAchievement")
    private double lowerBoundAchievement;

    @JsonProperty("upperBoundAchievement")
    private double upperBoundAchievement;

    @JsonProperty("commissionBase")
    private double commissionBase;

    @JsonProperty("commissionRate")
    private double commissionRate;

}

