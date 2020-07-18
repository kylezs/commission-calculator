package com.kylezs.commissionCalculator.api;


import com.kylezs.commissionCalculator.dto.CalculationDTO;
import com.kylezs.commissionCalculator.dto.CalculationResultDTO;
import com.kylezs.commissionCalculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/v1/calculate")
@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class CalculatorController {
    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping
    public CalculationResultDTO calculateAchievementAndRate(@RequestBody CalculationDTO calculationDTO) {
        return calculatorService.calculateCommissionResults(calculationDTO);
    }

}
