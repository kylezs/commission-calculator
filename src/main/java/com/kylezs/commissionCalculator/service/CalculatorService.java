package com.kylezs.commissionCalculator.service;

import com.kylezs.commissionCalculator.dto.CalculationDTO;
import com.kylezs.commissionCalculator.dto.CalculationResultDTO;
import com.kylezs.commissionCalculator.model.CommissionRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalculatorService {

    private final CommissionRateService commissionRateService;

    @Autowired
    public CalculatorService(CommissionRateService commissionRateService) {
        this.commissionRateService = commissionRateService;
    }

    public CalculationResultDTO calculateCommissionResults(CalculationDTO calculationDTO) throws InternalError {

        double achievement = calculateAchievement(calculationDTO.getActual(), calculationDTO.getTarget());

        // Get the commission rate this falls into
        Optional<CommissionRate> commissionRateMaybe = commissionRateService
                .selectCommissionRateForAchievement(achievement);

        if (commissionRateMaybe.isEmpty()) {
            throw new InternalError("No commission object exists for this achievement rate");
        }
        CommissionRate commissionRate = commissionRateMaybe.get();

        double calculatedRate = calculateCommissionRate(
                achievement,
                commissionRate
                );

        double commission = calculationDTO.getMotc() * calculatedRate;
        return new CalculationResultDTO(achievement, commission);
    }

    private double calculateAchievement(int actual, int target) throws IllegalArgumentException {
        if (target == 0) {
            throw new IllegalArgumentException("Cannot have a target of 0");
        }
        return actual / (double) target;
    }

    private double calculateCommissionRate(double achievement, CommissionRate commissionRate) {
        double aboveBase = achievement - commissionRate.getLowerBoundAchievement();
        return commissionRate.getCommissionBase() + (aboveBase * commissionRate.getCommissionRate());
    }
}
