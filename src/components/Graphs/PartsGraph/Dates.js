import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

/* import '../graph.sass';
 */
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Dates() {
  const classes = useStyles();

  const [startDate, setStartDate] = useState('');

  const addStartDate = (e) => {
    setStartDate(e.target.value);
    console.log(startDate);
    const data = { value: startDate };
    console.log(data);
    /*      this.props.handleChangeStartDate(data)
     */
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id='date'
        label='Start Date'
        type='date'
        value={startDate}
        className={classes.textField}
        onChange={addStartDate}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id='date'
        label='End Date'
        type='date'
        defaultValue='2017-05-24'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
