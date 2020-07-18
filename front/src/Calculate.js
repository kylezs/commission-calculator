import React from "react";
import { Link } from "react-router-dom";
import { COMMISSION_RATES } from "./routes";
import Layout from "./components/Layout";
import Heading from "./components/Heading";
import { Button, Paper } from "@material-ui/core";

const Calculate = () => {
  const calculateCommission = async () => {
    console.log("calculating...");
  };

  return (
    <Layout>
      <Heading>Calculate</Heading>
      <Link to={COMMISSION_RATES}>
        <Button>Commission Rate Managment</Button>
      </Link>
      <Paper>
        <form onSubmit={calculateCommission}></form>
        <p>Test</p>
      </Paper>
    </Layout>
  );
};

export default Calculate;
