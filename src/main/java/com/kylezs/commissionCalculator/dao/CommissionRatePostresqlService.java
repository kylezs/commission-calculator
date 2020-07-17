package com.kylezs.commissionCalculator.dao;

import com.kylezs.commissionCalculator.model.CommissionRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class CommissionRatePostresqlService implements CommissionRateDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CommissionRatePostresqlService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertCommissionRate(UUID id, CommissionRate commissionRate) {
        return 0;
    }

    @Override
    public int insertCommissionRate(CommissionRate commissionRate) {
        return 0;
    }

    @Override
    public List<CommissionRate> selectAllCommissionRates() {

        final String sql = "SELECT id, rateName, lowerBoundAchievement, upperBoundAchievement," +
                " commissionBase, commissionRate FROM commission_rate";
        // Marshal the data from the SQL result set to java objects
        return jdbcTemplate.query(sql, (resultSet, i) -> new CommissionRate(
                UUID.fromString(resultSet.getString("id")),
                resultSet.getString("rateName"),
                resultSet.getDouble("lowerBoundAchievement"),
                resultSet.getDouble("upperBoundAchievement"),
                resultSet.getDouble("commissionBase"),
                resultSet.getDouble("commissionRate")
                ));
    }

    @Override
    public Optional<CommissionRate> selectCommissionRateById(UUID id) {
        final String sql = "SELECT id, rateName, lowerBoundAchievement, upperBoundAchievement," +
                " commissionBase, commissionRate FROM commission_rate WHERE id=?";
        CommissionRate commissionRate =  jdbcTemplate.queryForObject(sql, new Object[]{id}, (resultSet, i) -> new CommissionRate(
                UUID.fromString(resultSet.getString("id")),
                resultSet.getString("rateName"),
                resultSet.getDouble("lowerBoundAchievement"),
                resultSet.getDouble("upperBoundAchievement"),
                resultSet.getDouble("commissionBase"),
                resultSet.getDouble("commissionRate")
        ));
        return Optional.ofNullable(commissionRate);
    }

    @Override
    public int deleteCommissionRateById(UUID id) {
        return 0;
    }

    @Override
    public int updateCommissionRateById(UUID id, CommissionRate commissionRate) {
        return 0;
    }
}
