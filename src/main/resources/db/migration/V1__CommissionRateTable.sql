CREATE TABLE commission_rate (
    id UUID NOT NULL PRIMARY KEY,

    rateName VARCHAR(100) NOT NULL,

    lowerBoundAchievement DECIMAL NOT NULL,

    upperBoundAchievement DECIMAL NOT NULL,

    commissionBase DECIMAL NOT NULL,

    commissionRate DECIMAL NOT NULL
)