# Commission Calculator

## Get The Developement Server Running ASAP
1. [Install docker](https://docs.docker.com/get-docker/)
2. `docker run --name commission-calc-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:alpine`
3. `git clone https://github.com/kylezs/commission-calculator.git`
4. `cd commission-calculator`


-- Setting up the db

`docker exec -it commission-calc-db bin/bash`

`psql -U postgres`
`CREATE DATABASE commissiondb;`

`\c commissiondb`
`CREATE EXTENSION "uuid-ossp";`

## Done?
1. `docker stop commission-calc-db`
2. `docker rm commission-calc-db`