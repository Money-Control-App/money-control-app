import React from "react";
import { Link, NavLink, BrowserRouter as Router, Route } from "react-router-dom";


export default function Tabs() {
  return (
    <div>
      <Link to="/dataanalusis/chargetable" className="link" activeClassName="active-link">
        Table
      </Link>
      <Link to="/dataanalusis/chargegraphic" className="link" activeClassName="active-link">
        Graphic
      </Link>
      <Link to="/dataanalusis/chargeincomes" className="link" activeClassName="active-link">
        Incomes
      </Link>

      <Router>

      </Router>
    </div>
  );
}
