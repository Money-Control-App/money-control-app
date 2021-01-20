import { Container } from '@material-ui/core';
import React from 'react';

import { MainSetting } from './MainSetting';
import { Header } from './PartsForm/Header';
import { DataProvider } from './DataUser';

export const Setting = ({ children, ...props }) => {
    return (
        <DataProvider>
            <Container
                maxWidth='sm'>
                <Header />
                <MainSetting />
            </Container>
        </DataProvider>
    )
}