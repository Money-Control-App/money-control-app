import React from "react";
import { Link, NavLink, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Charges from "../Table/Charges";
import Incomes from "../Table/Incomes";

export default function DataAnalysis() {
  return (

    <Router>
      <nav className='nav-setting'>
        <NavLink to="/data-analysis/charge" className="nav-setting-link" activeClassName="active-link-s">
          Charge
        </NavLink>
        <NavLink to="/data-analysis/incomes" className="nav-setting-link" activeClassName="active-link-s">
          Incomes
        </NavLink>
      </nav>

      <Switch>
        <Route path={'/'} component={Charges} />
        <Route path='/data-analysis/:incomes' component={Incomes} />
        <Route path='/data-analysis/:charge' component={Charges} />
      </Switch>
    </Router>

  );
}
