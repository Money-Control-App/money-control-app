import React from 'react';
import { Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CategoryIcon from '@material-ui/icons/Category';

import './header.sass';

export const Header = ({ type }) => {
    return (
        <div className='form__header'>
            {type === "Reminder" && <DoneAllIcon fontSize='large' />}
            {type === "Categories" && <CategoryIcon fontSize="large" />}
            {type === "User Setting" && <PersonAddIcon fontSize="large" />}
            <Typography
                align='center'
                variant='h4'>
                {type}
            </Typography>
        </div>
    )
}