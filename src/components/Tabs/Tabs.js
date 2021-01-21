import React from "react";
import { Link, NavLink, BrowserRouter as Router, Route } from "react-router-dom";


export default function Tabs() {
  return (
    <nav className='nav-setting'>
      <Link to="/data-analysis/chargetable" className="nav-setting-link" activeClassName="active-link-s">
        Table
      </Link>
      <Link to="/data-analysis/chargegraphic" className="nav-setting-link" activeClassName="active-link-s">
        Graphic
      </Link>
      <Link to="/data-analysis/chargeincomes" className="nav-setting-link" activeClassName="active-link-s">
        Incomes
      </Link>

      <Router>

      </Router>
    </nav>
  );
}
