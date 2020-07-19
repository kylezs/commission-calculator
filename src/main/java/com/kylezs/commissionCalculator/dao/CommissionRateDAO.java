package com.kylezs.commissionCalculator.dao;

import com.kylezs.commissionCalculator.model.CommissionRate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommissionRateDAO {

    CommissionRate insertCommissionRate(UUID id, CommissionRate commissionRate);

    default CommissionRate insertCommissionRate(CommissionRate commissionRate) {
        UUID id = UUID.randomUUID();
        return insertCommissionRate(id, commissionRate);
    }

    List<CommissionRate> selectAllCommissionRates();

    // Get a single commission rate
    Optional<CommissionRate> selectCommissionRateById(UUID id);

    // Find the commissionRate that covers the range this achievement falls within
    Optional<CommissionRate> selectCommissionRateForAchievement(double achievement);

    int deleteCommissionRateById(UUID id);

    int updateCommissionRateById(UUID id, CommissionRate commissionRate);
}
