import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import { SettingUser } from './User/SettingUser';
import { Header } from './PartsForm/Header';
import { DataProvider } from './User/DataUser';
import { Reminder } from './Reminder/Reminder';
import { Categories } from './Categories/Categories';

import NavSetting from './NavSetting';
import './setting.sass';

const userSetting = () => {
    return (
        <DataProvider>
            <Container
                maxWidth='sm'>
                <Header type='User Setting' />
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
                    <Route path='/setting/user' component={userSetting} />
                    <Route exact path='/setting/reminder' component={Reminder} />
                    <Route exact path='/setting/categories' component={Categories} />
                    <Route exact path={'/setting'} component={userSetting} />
                </Switch>
            </Router>
        </div>

    )
}
