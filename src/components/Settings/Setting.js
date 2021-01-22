import React from 'react';
import { Link, NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { SettingUser } from './User/SettingUser';
import { Header } from './PartsForm/Header';
import { DataProvider } from './User/DataUser';
import { Reminder } from './Reminder/Reminder';
import './setting.sass';
import NavSetting from './NavSetting';

const userSetting = () => {
    return (
    <DataProvider>
        <Container
            maxWidth='sm'>
            <Header>Setting UUser </Header>
            <SettingUser />
        </Container>
    </DataProvider>
    )
}
export const Setting = ({ children, ...props }) => {
    return (
        <div className='setting'>
            <Router>
                <NavSetting />
                <Switch>
                    <Route exact path='/setting/:user' component={userSetting} />
                    <Route path='/setting/:reminder' component={Reminder} />
                    <Route exact path={'/setting'} component={Reminder} />
                </Switch>
            </Router>
        </div>

    )
}