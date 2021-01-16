import React from "react";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";

export default function NavPanel() {
  return (
    <nav className="nav">
        <div>here will be a logo</div>
        <div>
        <NavLink className="link" activeClassName="active-link" to="/home">
          Home
        </NavLink>
        <NavLink className="link" activeClassName="active-link" to="/categories">
          Categories
        </NavLink>
        <NavLink className="link" activeClassName="active-link" to="/dataAnalysis">
          Data analysis
        </NavLink>
        </div>
      </nav>
  );
}
