import React from 'react';

function FillForm({ children, ...props }) {

    return (
        <form noValidate {...props} className='form-user'>
            {children}
        </form>
    )
}

export default FillForm;