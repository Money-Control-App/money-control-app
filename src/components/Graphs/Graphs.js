import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import BoxGraph from './BoxGraph';
import Dates from './PartsGraph/Dates';
import LinearGraph from './LinearGraph';
import RadialGraph from './RadialGraph';

import './graph.sass';

function Graphs() {
  const [dataType, setDataType] = useState('incomes');
  const handleChangeDataType = (e) => setDataType(e.target.value);

  const [startDate, setStartDate] = useState('2020-12-24');
  const addStartDate = (e) => { 
    let newdate = e.target.value
    newdate= newdate.toLocaleDateString()
    setStartDate(newdate)};

  const [endDate, setEndDate] = useState('2021-01-31');
  const addEndDate = (e) => {
    let newdate = e.target.value
    newdate= newdate.toLocaleDateString()
    setEndDate(newdate)};

  console.log(dataType);
  console.log(startDate);
  console.log(endDate);

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
  const classes = useStyles();

  return (
    <div className='graph-wrapper'>
      <nav className='graph-nav'>
        <div className='graph-inputs'>
          <div className='input-type'>
            <FormControl
              component='fieldset'
              onChange={handleChangeDataType}
              className='inputs'
            >
              <RadioGroup
                row
                aria-label='inputType'
                name='inputType'
                defaultValue='incomes'
              >
                <FormControlLabel
                  value='incomes'
                  control={<Radio color='primary' />}
                  label='Income'
                  labelPlacement='end'
                />
                <FormControlLabel
                  value='charges'
                  control={<Radio color='primary' />}
                  label='Expenses'
                  labelPlacement='end'
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className='input-dates'>
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
                value={endDate}
                className={classes.textField}
                onChange={addEndDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        </div>
        <div className='graph'>
          {' '}
          <Router>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/radial'
            >
              Radial
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/linear'
            >
              Linear
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/box'
            >
              Bar
            </NavLink>
            <Switch>
              <Route
                className='radial'
                path='/data-analysis/radial'
                exact
                component={() => <RadialGraph source={dataType} />}
              />
              <Route
                path='/data-analysis/linear'
                exact
                component={() => <LinearGraph source={dataType} />}
              />
              <Route
                path='/data-analysis/box'
                exact
                component={() => (
                  <BoxGraph
                    source={dataType}
                    startDate={startDate}
                    endDate={endDate}
                  />
                )}
              />
              <Route
                className='radial'
                path='/'
                component={() => <RadialGraph source={dataType} />}
              />
            </Switch>
          </Router>
        </div>
        {/*  <div className='flex-wrapper-graphs'>
          <RadialGraph source={dataType} />
          <LinearGraph source={dataType} />
          <BoxGraph source={dataType} />
          </div> */}
      </nav>
    </div>
  );
}

export default Graphs;
