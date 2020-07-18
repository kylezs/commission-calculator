import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COMMISSION_RATES } from "./routes";
import Layout from "./components/Layout";
import Heading from "./components/Heading";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Snackbar,
  CardContent,
  Card,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { CALCULATE_API_URL } from "./apiconfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Calculate = () => {
  const [result, setResult] = useState({});

  const calculateCommission = async (event) => {
    event.preventDefault();
    if (!validateFormData()) {
      return;
    }
    console.log("calculating...");
    console.log(actual, target, motc);
    const postData = {
      actual,
      target,
      motc,
    };
    const resp = await axios.post(CALCULATE_API_URL, postData);
    if (resp.status === 200) {
      setResult(resp.data);
    } else {
      setError("Error doing calculation.");
    }
  };

  const validateFormData = () => {
    if (actual < 0 || target <= 0 || motc < 0) {
      setError(
        "All values must be greater than or equal to 0. Target must be strictly greater than 0."
      );
      return false;
    }
    return true;
  };
  const classes = useStyles();

  const [actual, setActual] = useState("");
  const [target, setTarget] = useState("");
  const [motc, setMotc] = useState("");
  const [error, setError] = useState("");

  const changeActual = (value) => {
    if (!isNaN(value)) {
      setActual(value);
    }
  };
  const changeTarget = (value) => {
    if (!isNaN(value)) {
      setTarget(value);
    }
  };
  const changeMotc = (value) => {
    if (!isNaN(value)) {
      setMotc(value);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  return (
    <Layout>
      <Heading>Calculate</Heading>
      <Link to={COMMISSION_RATES}>
        <Button>Commission Rate Managment</Button>
      </Link>
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={calculateCommission}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="actual"
                name="actual"
                variant="outlined"
                required
                fullWidth
                id="actual"
                label="Actual sales"
                autoFocus
                value={actual}
                onChange={(event) => {
                  changeActual(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="target"
                label="Target sales"
                error={error !== "" && target <= 0}
                name="target"
                value={target}
                onChange={(event) => {
                  changeTarget(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="motc"
                label="Monthly On-Target Commission"
                name="motc"
                value={motc}
                onChange={(event) => {
                  changeMotc(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Calculate Commission
          </Button>
        </form>
        <Card>
          <CardContent>
            <Typography variant="h5">Commission</Typography>
            {result.commission ? result.commission : "To be calculated"}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Achievement</Typography>
            {result.achievement ? result.achievement : "To be calculated"}
          </CardContent>
        </Card>
        <Snackbar
          open={"" !== error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert onClose={handleClose} severity="error">
            {error}
          </MuiAlert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default Calculate;
