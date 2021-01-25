import React, { useState } from "react";
import { Link, NavLink, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Graphs from "../Graphs/Graphs";
import Charges from "../Table/Charges";
import Incomes from "../Table/Incomes";
import Balance from '../Balance/Balance'
import './nav-tables.sass';

// const balanceStyle = (totalBalance() > 0)? 'balance-positive' : 'balance-negative'



const NavTab = ({charges,setCharges,incomes,setIncomes}) => {
  
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
        <Route exact path={'/data-analysis'}>
          <Incomes incomes={incomes} setIncomes={setIncomes} />
        </Route>
        <Route exact path='/data-analysis/tables/charges'>
          <Charges charges={charges} setCharges={setCharges} />
        </Route>
        <Route exact path='/data-analysis/tables/incomes'>
          <Incomes incomes={incomes} setIncomes={setIncomes} />
        </Route>
      </Switch>
    </Router>
  )
}
export default function DataAnalysis() {
  const [charges, setCharges] = useState(
    JSON.parse(localStorage.getItem("charges"))
  );
  const [incomes, setIncomes] = useState(
    JSON.parse(localStorage.getItem("incomes"))
  );
  return (
    <Router>
      <nav className='nav-setting-data'>
        <div className='nav-balance'>
          Total balance: <Balance charges={charges} incomes={incomes} />
        </div>
        <div className='nav-data'>
          <NavLink to="/data-analysis/tables" className="nav-setting-link" activeClassName="active-link-s">
            Tables
          </NavLink>
          <NavLink to="/data-analysis/graphics" className="nav-setting-link" activeClassName="active-link-s">
            Graphics
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route exact path={'/data-analysis'}>
          <NavTab charges={charges} setCharges={setCharges} incomes={incomes} setIncomes={setIncomes} />
        </Route>
        <Route exact path='/data-analysis/tables' >
          <NavTab charges={charges} setCharges={setCharges} incomes={incomes} setIncomes={setIncomes} />
        </Route>
        <Route exact path='/data-analysis/graphics' component={Graphs} />
      </Switch>
    </Router>

  );
}
