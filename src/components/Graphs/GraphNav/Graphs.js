import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import BoxGraph from '../BoxGraph/BoxGraph';
import ForecastGraph from '../Forecast/ForeacstGraph';
import LinearGraph from '../LinearGraph/LinearGraph';
import RadialGraph from '../RadialGraph/RadialGraph';

import './graph.sass';

function Graphs() {
  const [dataType, setDataType] = useState('incomes');
  const handleChangeDataType = (e) => setDataType(e.target.value);

  const pastDate = moment().subtract(30, 'days').format('YYYY-MM-DD');

  const [startDate, setStartDate] = useState(pastDate);
  const addStartDate = (e) => {
    const newdate = e.target.value;
    setStartDate(newdate);
  };

  const currentDate = moment().format('YYYY-MM-DD');

  const [lastDate, setLastDate] = useState(currentDate);
  const addLastDate = (e) => {
    const newdate = e.target.value;
    setLastDate(newdate);
  };

  const datesErrorStyle =
    Date.parse(lastDate) > Date.parse(startDate)
      ? 'error-hidden'
      : 'error-visible';

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
                value={lastDate}
                className={classes.textField}
                onChange={addLastDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <p className={datesErrorStyle}>
              Oooops.. seems like the dates are messed a bit, please check one
              more time!
            </p>
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
              Donut chart
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/linear'
            >
              Linear chart
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/box'
            >
              Bar chart
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-graph-link'
              to='/data-analysis/forecast'
            >
              Forecast
            </NavLink>
            <Switch>
              <Route
                className='radial'
                path='/data-analysis/radial'
                exact
                component={() => (
                  <RadialGraph
                    source={dataType}
                    startDate={startDate}
                    lastDate={lastDate}
                  />
                )}
              />
              <Route
                path='/data-analysis/linear'
                exact
                component={() => (
                  <LinearGraph
                    source={dataType}
                    startDate={startDate}
                    lastDate={lastDate}
                  />
                )}
              />
              <Route
                path='/data-analysis/box'
                exact
                component={() => (
                  <BoxGraph
                    source={dataType}
                    startDate={startDate}
                    lastDate={lastDate}
                  />
                )}
              />
              <Route
                exact
                className='radial'
                path='/data-analysis/forecast'
                component={() => <ForecastGraph />}
              />
              <Route
                className='radial'
                path='/'
                component={() => (
                  <RadialGraph
                    source={dataType}
                    startDate={startDate}
                    lastDate={lastDate}
                  />
                )}
              />
            </Switch>
          </Router>
        </div>
      </nav>
    </div>
  );
}

export default Graphs;
