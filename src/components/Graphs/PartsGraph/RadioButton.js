import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function RadioButton(props) {
  return (
    <FormControlLabel
      value='top'
      control={<Radio color='primary' />}
      label={props.label}
      labelPlacement='end'
    />
  )
}
