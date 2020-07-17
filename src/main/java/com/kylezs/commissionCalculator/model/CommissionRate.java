package com.kylezs.commissionCalculator.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class CommissionRate {

    @JsonProperty("id")
    private final UUID id;

    @JsonProperty("rateName")
    private String rateName;

    // Create a range.
    // TODO: It's important that ranges don't overlap. This: b1 > e2 OR e1 < b2 => they do overlap
    @JsonProperty("lowerBoundAchievement")
    private double lowerBoundAchievement;

    @JsonProperty("upperBoundAchievement")
    private double upperBoundAchievement;

    @JsonProperty("commissionBase")
    private double commissionBase;

    @JsonProperty("commissionRate")
    private double commissionRate;

    public CommissionRate(
            UUID id,
            String rateName,
            double lowerBoundAchievement,
            double upperBoundAchievement,
            double commissionBase,
            double commissionRate) {
        this.id = id;
        this.rateName = rateName;
        this.lowerBoundAchievement = lowerBoundAchievement;
        this.upperBoundAchievement = upperBoundAchievement;
        this.commissionBase = commissionBase;
        this.commissionRate = commissionRate;
    }

}

