package com.kylezs.commissionCalculator.api;

import com.kylezs.commissionCalculator.model.CommissionRate;
import com.kylezs.commissionCalculator.service.CommissionRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/commissionRate")
@RestController
public class CommissionRateController {

    private final CommissionRateService commissionRateService;

    @Autowired
    public CommissionRateController(CommissionRateService commissionRateService) {
        this.commissionRateService = commissionRateService;
    }

    @PostMapping
    public void addCommissionRate(@RequestBody CommissionRate commissionRate) {
        commissionRateService.addCommissionRate(commissionRate);
    }

    @GetMapping
    public List<CommissionRate> getAllCommissionRates() {
        return commissionRateService.getAllCommissionRates();
    }

    // TODO: Custom error message here
    @GetMapping(path = "{id}")
    public CommissionRate getCommissionRateById(@PathVariable("id") UUID id) {
        return commissionRateService.getCommissionRateById(id)
                .orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public void deleteCommissionRateById(@PathVariable("id") UUID id) {
        commissionRateService.deleteCommissionRate(id);
    }

    @PutMapping(path = "{id}")
    public void updateCommissionRate(@PathVariable("id") UUID id, @RequestBody CommissionRate commissionRateToUpdate) {
        commissionRateService.updateCommissionRate(id, commissionRateToUpdate);
    }
}
