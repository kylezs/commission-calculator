package com.kylezs.commissionCalculator.dao;

import com.kylezs.commissionCalculator.model.CommissionRate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeDao")
public class FakeCommissionRateDataAccessService implements CommissionRateDAO {

    private static List<CommissionRate> DB = new ArrayList<>();

    @Override
    public int insertCommissionRate(UUID id, CommissionRate commissionRate) {
        DB.add(new CommissionRate(id, commissionRate.getRateName(),
                commissionRate.getLowerBoundAchievement(),
                commissionRate.getUpperBoundAchievement(),
                commissionRate.getCommissionBase(),
                commissionRate.getCommissionRate()));
        return 1;
    }

    @Override
    public List<CommissionRate> selectAllCommissionRates() {
        return DB;
    }

    @Override
    public Optional<CommissionRate> selectCommissionRateById(UUID id) {
        return DB.stream()
                .filter(commissionRate -> commissionRate.getId().equals(id))
                .findFirst();
    }

    @Override
    public Optional<CommissionRate> selectCommissionRateForAchievement(double achievement) {
        return Optional.empty();
    }

    @Override
    public int deleteCommissionRateById(UUID id) {
        Optional<CommissionRate> commissionRateMaybe = selectCommissionRateById(id);
        if (commissionRateMaybe.isEmpty()) {
            return 0;
        }
        DB.remove(commissionRateMaybe.get());
        return 1;
    }

    @Override
    public int updateCommissionRateById(UUID id, CommissionRate update) {
        return selectCommissionRateById(id)
                .map(commissionRate -> {
                    int indexOfCommissionRateToUpdate = DB.indexOf(commissionRate);
                    if (indexOfCommissionRateToUpdate >=0) {
                        DB.set(indexOfCommissionRateToUpdate, update);
                        return 1;
                    }
                    return 0;
                })
                .orElse(0);
    }
}
