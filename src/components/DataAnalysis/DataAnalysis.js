import React from "react";
import { Link, NavLink, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Graphs from "../Graphs/Graphs";
import Charges from "../Table/Charges";
import Incomes from "../Table/Incomes";

const NavTab = () => {
  return (
    <Router>
      <nav className={`nav-setting nav-tables`}>
        <NavLink to="/data-analysis/tables/charges" className="nav-setting-link" activeClassName="active-link-s">
          Charges
        </NavLink>
        <NavLink to="/data-analysis/tables/incomes" className="nav-setting-link" activeClassName="active-link-s">
          Incomes
        </NavLink>
      </nav>
      <Switch>
        {/* <Route path={'/data-analysis'} component={Charges} /> */}
        <Route path='/data-analysis/:tables/:charges' component={Charges} />
        <Route path='/data-analysis/:tables/:incomes' component={Incomes} />
      </Switch>
    </Router>
  )
}
export default function DataAnalysis() {
  return (
    <Router>
      <nav className='nav-setting'>
        <NavLink to="/data-analysis/tables" className="nav-setting-link" activeClassName="active-link-s">
          Tables
        </NavLink>
        <NavLink to="/data-analysis/graphics" className="nav-setting-link" activeClassName="active-link-s">
          Graphics
        </NavLink>
      </nav>

      <Switch>
        <Route exact path={'/data-analysis'} component={Graphs} />
        <Route exact path='/data-analysis/:tables' component={NavTab} />
        <Route exact path='/data-analysis/:graphics' component={Graphs} />
      </Switch>
    </Router>

  );
}
