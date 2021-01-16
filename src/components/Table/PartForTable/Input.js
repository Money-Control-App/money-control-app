import React, { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';

export const Input = forwardRef((props, ref) => {
    return <TextField
        className='table__input'
        variant='standard'
        margin='normal'
        inputRef={ref}
        size='medium'
        fullWidth
        {...props}
    />
});