import React from "react";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";

import logo from '../../img/icons/logo.svg';
import './nav.sass';

export default function NavPanel() {
  return (
    <div className='nav__container'>
      <nav className={`nav nav--shadow`}>
        <div className='nav__logo'>
          <img className='nav__logo--img'  src={logo}/>
          <h4 className='nav__logo--text'>KeePocket</h4>
        </div>
        <div className='nav__links'>
          <NavLink className="nav__link" activeClassName="active-link" to="/setting">
            Setting
        </NavLink>
          <NavLink className="nav__link" activeClassName="active-link" to="/data-analysis">
            Data
        </NavLink>

        </div>
      </nav>
    </div>
  );
}