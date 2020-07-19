CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO commission_rate
 VALUES
 (uuid_generate_v4(), 'Atrocious', 0, 0.8, 0, 0),
 (uuid_generate_v4(), 'Poor', 0.8, 1.0, 0.8, 1.0),
 (uuid_generate_v4(), 'OK', 1.0, 2.0, 1, 1.5),
 (uuid_generate_v4(), 'Good', 2.0, 3.0, 2.5, 0.5),
 (uuid_generate_v4(), 'God', 3.0, 99.99, 3.0, 3.0);