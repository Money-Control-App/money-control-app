import React from 'react';
import { Container } from '@material-ui/core';
import { MainSetting } from './MainSetting';
import { Header } from './PartsForm/Header';

export const Setting = ({ children, ...props }) => {
    return (
        <Container
            maxWidth='sm'>
            <Header />
            <MainSetting />
        </Container>
    )
}