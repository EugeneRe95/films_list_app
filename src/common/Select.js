import React from 'react'
import {Select as MaterialSelect} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {v4 as uuidv4} from 'uuid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

function Select({value, onChange, name, label, data}) { 
    const classes = useStyles()
    const id=uuidv4()
    return (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id={id}>{label}</InputLabel>
          <MaterialSelect
            value={value}
            labelId={id}
            label={label}
            name={name}
            onChange={onChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data && data.map(item=>{
              return <MenuItem key={uuidv4()} value={item.value}>{item.title}</MenuItem>
            })}
          </MaterialSelect>
        </FormControl>
    )
}

export default Select
