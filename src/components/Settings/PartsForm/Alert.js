import React from 'react';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import './alert.sass';

export const AlertOwn = ({ open, resetAlert, text }) => {
    return (

        <Collapse in={open} className='alert-own'>
            <Alert
                severity="success"
                variant='filled'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"

                        onClick={resetAlert}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {text}
            </Alert>
        </Collapse>
    )
}