import React, { useState } from "react";
import { Link, NavLink, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Balance from '../Balance/Balance'
import Graphs from "../Graphs/GraphNav/Graphs";
import ErrorPage from "../ErrorPage/ErrorPage";
import Charges from "../Table/Charges";
import Incomes from "../Table/Incomes";
import Table from '../Table/Table'
import './nav-tables.sass';




const NavTab = ({charges,setCharges,incomes,setIncomes}) => {
  console.log(charges)
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
          <Table title='charge' rows={charges} setRows={setCharges}  />
        </Route>
        <Route exact path='/data-analysis/tables/charges'>
          <Table title='charge' rows={charges} setRows={setCharges} />
        </Route>
        <Route exact path='/data-analysis/tables/incomes'>
        console.log(charges)
        <Table title='income' rows={incomes} setRows={setIncomes} />
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
      const balanceStyle = (Balance({charges,incomes}) > 0)? 'balance-positive' : 'balance-negative'

      return (
        <Router>
      <nav className='nav-setting-data'>
        <div className='nav-balance'>
          Total balance: <span className = {balanceStyle}>{Balance ({charges,incomes}) } </span>
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