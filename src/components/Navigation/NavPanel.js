import React from "react";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";

export default function NavPanel() {
  return (
    <nav className="nav">
        <div>here will be a logo</div>
        <div>
        <NavLink className="link" activeClassName="active-link" to="/setting">
          Setting
        </NavLink>
        {/* <NavLink className="link" activeClassName="active-link" to="/graphs">
        Graphs
        </NavLink>
        <NavLink className="link" activeClassName="active-link" to="/incomes">
        incomes
        </NavLink>
        
        <NavLink className="link" activeClassName="active-link" to="/charges">
        Charges
        </NavLink> */}
        <NavLink className="link" activeClassName="active-link" to="/dataanalusis">
          Data analysis
        </NavLink> 
        </div>
      </nav>
  );
}
