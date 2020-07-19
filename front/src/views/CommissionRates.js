import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CALCULATE } from "../routes";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Button } from "@material-ui/core";
import CommissionRatesTable from "../components/CommissionRatesTable";
import axios from "axios";
import { COMMISSION_RATE_API_URL } from "../apiconfig";

const CommissionRates = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(COMMISSION_RATE_API_URL);

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Heading>Commission Rate Management</Heading>
      <Link to={CALCULATE}>
        <Button>Calculate</Button>
      </Link>
      <CommissionRatesTable tableData={data} />
    </Layout>
  );
};

export default CommissionRates;
