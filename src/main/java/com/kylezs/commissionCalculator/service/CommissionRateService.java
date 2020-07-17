package com.kylezs.commissionCalculator.service;

import com.kylezs.commissionCalculator.dao.CommissionRateDAO;
import com.kylezs.commissionCalculator.model.CommissionRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

//Allow addition a rates table row
//        Allow deletion a rates table row
//        Allow modification of the values of existing rates table rows
//        Achievement ranges of the rows are continuous, i.e. achievement row 1 < 0.8, and achievement row 2 >= 0.8
//        Validate user input and show error
//        Base >=0
//        Rate >=0

@Service
public class CommissionRateService {

    private final CommissionRateDAO commissionRateDAO;

    @Autowired
    public CommissionRateService(@Qualifier("postgres") CommissionRateDAO commissionRateDAO) {
        this.commissionRateDAO = commissionRateDAO;
    }

    public int addCommissionRate(CommissionRate commissionRate) {
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

    public Optional<CommissionRate> getCommissionRateById(UUID id) {
        return commissionRateDAO.selectCommissionRateById(id);
    }
}
