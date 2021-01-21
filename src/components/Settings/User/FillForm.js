import React from 'react';

function FillForm({ children, ...props }) {

    return (
        <form noValidate {...props}>
            {children}
        </form>
    )
}

export default FillForm;