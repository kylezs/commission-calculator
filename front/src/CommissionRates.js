import React from "react";
import { Link } from "react-router-dom";
import { CALCULATE } from "./routes";
import Layout from "./components/Layout";
import Heading from "./components/Heading";
import { Button } from "@material-ui/core";

const CommissionRates = () => {
  return (
    <Layout>
      <Heading>Commission Rate Management</Heading>
      <Link to={CALCULATE}>
        <Button>Calculate</Button>
      </Link>
    </Layout>
  );
};

export default CommissionRates;
