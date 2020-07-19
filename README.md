# Commission Calculator

This is a Java Spring Application with a ReactJS Frontend.

It can calculate commissions based on an editable commissions calculator.

## Get The Developement Server Running
1. [Install docker](https://docs.docker.com/get-docker/)
2. `docker run --name commission-calc-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:alpine`
3. `git clone https://github.com/kylezs/commission-calculator.git`
4. Cd into the root of the project. `cd commission-calculator`


## Setup the DB
1. `docker exec -it commission-calc-db bin/bash`
2. `psql -U postgres`
3. `CREATE DATABASE commissiondb;`

## Start the backend
1. In IntelliJ open `src/java/com.kylezs.commissionCalculator`
2. Click the green Play button to start the application.

## Start the frontend in dev mode
1. `cd front`
2. `yarn install` 
3. `yarn start`

## View application
1. Open `http://localhost:3000` in your browser

## Stop the DB
1. `docker stop commission-calc-db`
2. `docker rm commission-calc-db`