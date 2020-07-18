import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calculate from "./Calculate";
import CommissionRates from "./CommissionRates";
import { CALCULATE, COMMISSION_RATES } from "./routes";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={COMMISSION_RATES}>
            <CommissionRates />
          </Route>
          <Route path={CALCULATE}>
            <Calculate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
