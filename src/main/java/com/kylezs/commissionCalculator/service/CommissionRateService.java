package com.kylezs.commissionCalculator.service;

import com.kylezs.commissionCalculator.dao.CommissionRateDAO;
import com.kylezs.commissionCalculator.model.CommissionRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CommissionRateService {

    private final CommissionRateDAO commissionRateDAO;

    @Autowired
    public CommissionRateService(@Qualifier("postgres") CommissionRateDAO commissionRateDAO) {
        this.commissionRateDAO = commissionRateDAO;
    }

    public CommissionRate addCommissionRate(CommissionRate commissionRate) {
        return commissionRateDAO.insertCommissionRate(commissionRate);
    }

    public List<CommissionRate> getAllCommissionRates() {
        return commissionRateDAO.selectAllCommissionRates();
    }

    public int deleteCommissionRate(UUID id) {
        return commissionRateDAO.deleteCommissionRateById(id);
    }

    public int updateCommissionRate(UUID id, CommissionRate commissionRate) {
        return commissionRateDAO.updateCommissionRateById(id, commissionRate);
    }

    public Optional<CommissionRate> selectCommissionRateForAchievement(double achievement) {
        return commissionRateDAO.selectCommissionRateForAchievement(achievement);
    }

    public Optional<CommissionRate> getCommissionRateById(UUID id) {
        return commissionRateDAO.selectCommissionRateById(id);
    }

}
