import React from 'react';
import { Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import './header.sass';

export const Header = ({children}) => {
    return (
        <div className='form__header'>
            {children === "Reminder" && <DoneAllIcon fontSize = 'large'/>}
            {children !== "Reminder" &&  <PersonAddIcon fontSize="large" />}
           
            <Typography
                align='center'
                variant='h4'>
                {children}
            </Typography>
        </div>
    )
}