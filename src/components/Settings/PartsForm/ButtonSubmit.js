import React from 'react';
import { Button } from '@material-ui/core';

export const ButtonSubmit = ({ children, props }) => {
    return (
        <Button
            type='submit'
            fullWidth
            variant='contained'
            {...props} >
            {children}
        </Button>
    )
}