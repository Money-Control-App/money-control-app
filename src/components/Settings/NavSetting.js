import React from "react";
import { NavLink } from "react-router-dom";

import './nav-setting.sass';

export default function NavSetting() {
    return (
        <nav className={`nav-setting`}>
            <NavLink className='nav-setting-link' activeClassName="active-link-s" to="/setting/user">
                Setting User
            </NavLink>
            <NavLink className="nav-setting-link" activeClassName="active-link-s" to="/setting/reminder">
                Reminder
            </NavLink>
        </nav>
    );
}
