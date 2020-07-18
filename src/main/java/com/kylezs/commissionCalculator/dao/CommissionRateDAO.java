package com.kylezs.commissionCalculator.dao;

import com.kylezs.commissionCalculator.model.CommissionRate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommissionRateDAO {

    int insertCommissionRate(UUID id, CommissionRate commissionRate);

    default int insertCommissionRate(CommissionRate commissionRate) {
        UUID id = UUID.randomUUID();
        return insertCommissionRate(id, commissionRate);
    }

    List<CommissionRate> selectAllCommissionRates();

    // Get a single commission rate
    Optional<CommissionRate> selectCommissionRateById(UUID id);

    Optional<CommissionRate> selectCommissionRateForAchievement(double achievement);

    int deleteCommissionRateById(UUID id);

    int updateCommissionRateById(UUID id, CommissionRate commissionRate);
}
