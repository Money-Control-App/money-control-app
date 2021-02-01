import React from 'react';
import Button from '@material-ui/core/Button';

export const ButtonsForTable = ({ children, clickBtn, props }) => {
    return (
        <Button
            type="button"
            size="medium"
            variant='contained'
            onClick={clickBtn}
            {...props} >
            {children}
        </Button>
    )
}