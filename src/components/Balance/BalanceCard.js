import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import balance from './Balance'

import './balance.sass';

const balanceStyle = (balance > 0) ? 'balance-positive' : 'balance-negative'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function BalanceCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
           <Paper elevation={3} className={balanceStyle}>You current balance is {balance} </Paper>
    </div>
  );
}
