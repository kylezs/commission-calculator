INSERT INTO commission_rate
 VALUES (uuid_generate_v4(), "Atrocious", 0, 0.8, 0, 0)
INSERT INTO commission_rate
 VALUES (uuid_generate_v4(), "Poor", 0.8, 1.0, , 0.8, 1.0)
INSERT INTO commission_rate
 VALUES (uuid_generate_v4(), "OK", 1.0, 2.0, 1, 1.5)
INSERT INTO commission_rate
 VALUES (uuid_generate_v4(), "Good", 2.0, 3.0, 2.5, 0.5)
INSERT INTO commission_rate
 VALUES (uuid_generate_v4(), "God", 3.0, 99.99, 3.0, 3.0)


-- id, rateName, lowerBoundAchievement, upperBoundAchievement, commissionBase, commissionRate
--Range
--Base
--Rate
--0 <= achievement < 0.8	0	0
--0.8  <= achievement <  1.0	0.8	1.0
--1.0  <= achievement <  2.0	1	1.5
--2.0  <= achievement <  3.0	2.5	0.5
--3.0  <= achievement <  99.99	3.0	0.0
