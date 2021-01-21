import React from 'react';
import { Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const Header = ({children}) => {
    return (
        <div className='form__header'>
            <PersonAddIcon fontSize="large" />
            <Typography
                align='center'
                variant='h4'>
                {children}
            </Typography>
        </div>
    )
}