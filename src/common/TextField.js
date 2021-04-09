import React from 'react'
import {TextField as MaterialTextField} from '@material-ui/core';

function TextField({
    className,
    value,
    onChange,
    label,
    InputProps,
    name,
    error,
    helperText,
    ...props
}) {
    return (<MaterialTextField
        variant="outlined"
        {...props}
        label={label}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        error={error}
        helperText={error && helperText}
        InputProps={InputProps}/>)
}

export default TextField
