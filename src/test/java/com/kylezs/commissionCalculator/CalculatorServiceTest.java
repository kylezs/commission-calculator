package com.kylezs.commissionCalculator;

import com.kylezs.commissionCalculator.dto.CalculationDTO;
import com.kylezs.commissionCalculator.dto.CalculationResultDTO;
import com.kylezs.commissionCalculator.model.CommissionRate;
import com.kylezs.commissionCalculator.service.CalculatorService;
import com.kylezs.commissionCalculator.service.CommissionRateService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;

@RunWith(SpringRunner.class)
public class CalculatorServiceTest {

    @Mock
    private CommissionRateService commissionRateService;

    @InjectMocks
    private CalculatorService calculatorService;

    @Test
    public void calculateCommissionResult_example1() {
        CalculationDTO calculationDTO = new CalculationDTO();
        calculationDTO.setActual(79);
        calculationDTO.setTarget(100);
        calculationDTO.setMotc(5000);
        double expectedAchievement = 0.79;
        double expectedCommission = 0;

        Optional<CommissionRate> commissionRate =
                Optional.of(new CommissionRate(
                UUID.randomUUID(),
                "rateName",
                0 ,
                1,
                0,
                0));

        doReturn(commissionRate).when(commissionRateService).selectCommissionRateForAchievement(expectedAchievement);

        CalculationResultDTO result = calculatorService.calculateCommissionResults(calculationDTO);

        assertEquals(expectedAchievement, result.getAchievement(), 0.001);
        assertEquals(expectedCommission, result.getCommission(), 0.001);
    }

    @Test
    public void calculateCommissionResult_example2() {
        CalculationDTO calculationDTO = new CalculationDTO();
        calculationDTO.setActual(100);
        calculationDTO.setTarget(100);
        calculationDTO.setMotc(5000);
        double expectedAchievement = 1.00;
        double expectedCommission = 5000;

        Optional<CommissionRate> commissionRate =
                Optional.of(new CommissionRate(
                        UUID.randomUUID(),
                        "rateName",
                        0.8 ,
                        1,
                        0.8,
                        1));

        doReturn(commissionRate).when(commissionRateService).selectCommissionRateForAchievement(expectedAchievement);

        CalculationResultDTO result = calculatorService.calculateCommissionResults(calculationDTO);

        assertEquals(expectedAchievement, result.getAchievement(), 0.001);
        assertEquals(expectedCommission, result.getCommission(), 0.001);
    }

    @Test
    public void calculateCommissionResult_example3() {
        CalculationDTO calculationDTO = new CalculationDTO();
        calculationDTO.setActual(210);
        calculationDTO.setTarget(100);
        calculationDTO.setMotc(5000);
        double expectedAchievement = 2.1;
        double expectedCommission = 12750;

        Optional<CommissionRate> commissionRate =
                Optional.of(new CommissionRate(
                        UUID.randomUUID(),
                        "rateName",
                        2,
                        3,
                        2.5,
                        0.5));

        doReturn(commissionRate).when(commissionRateService).selectCommissionRateForAchievement(expectedAchievement);

        CalculationResultDTO result = calculatorService.calculateCommissionResults(calculationDTO);

        assertEquals(expectedAchievement, result.getAchievement(), 0.001);
        assertEquals(expectedCommission, result.getCommission(), 0.001);
    }

    @Test(expected = InternalError.class)
    public void calculateCommissionResult_noCommissionRate() {
        CalculationDTO calculationDTO = new CalculationDTO();
        calculationDTO.setActual(210);
        calculationDTO.setTarget(100);
        calculationDTO.setMotc(5000);
        double expectedAchievement = 312232;

        Optional<CommissionRate> commissionRate = Optional.empty();

        doReturn(commissionRate).when(commissionRateService).selectCommissionRateForAchievement(expectedAchievement);

        // should throw Internal Error
        calculatorService.calculateCommissionResults(calculationDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void calculateCommissionResult_targetIs0() {
        CalculationDTO calculationDTO = new CalculationDTO();
        calculationDTO.setActual(210);
        calculationDTO.setTarget(0);
        calculationDTO.setMotc(5000);
        double expectedAchievement = 1.3;

        Optional<CommissionRate> commissionRate =
                Optional.of(new CommissionRate(
                        UUID.randomUUID(),
                        "rateName",
                        0 ,
                        1,
                        0,
                        0));

        doReturn(commissionRate).when(commissionRateService).selectCommissionRateForAchievement(expectedAchievement);

        // should throw Internal Error
        calculatorService.calculateCommissionResults(calculationDTO);
    }
}
