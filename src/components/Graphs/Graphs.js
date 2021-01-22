import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import BoxGraph from './BoxGraph';
import Dates from './PartsGraph/Dates';
import LinearGraph from './LinearGraph';
import RadialGraph from './RadialGraph';

import './graph.sass';

function Graphs() {
  const [dataType, setDataType] = useState('incomes');
  const handleChangeDataType = (e) => setDataType(e.target.value);

  const [startDate, setStartDate] = useState('');
  const handleChangeStartDate = (data) => setStartDate(data.value);

  const [endtDate, setEndDate] = useState('');
  const handleChangeEndDate = (e) => setEndDate(e.target.value);

  console.log(dataType);
  console.log(startDate);
  console.log(endtDate);

  return (
    <div className='graph-wrapper'>
      <nav className='graph-nav'>
        <div className='graph-inputs'>
          <div className='input-type'>
            <FormControl component='fieldset' onChange={handleChangeDataType} className = 'inputs'>
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
            <Dates
            /*               handleChangeStartDate = {this.handleChangeStartDate}
             */
            />
          </div>
        </div>
        <div className='graph'>
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
              component={() => <BoxGraph source={dataType} />}
            />
            <Route
              className='radial'
               path='/data-analysis'
               exact
              component={() => <RadialGraph source={dataType} />} />
            </Switch>
          </Router>
        </div>
      </nav>
    </div>
  );
}

export default Graphs;
