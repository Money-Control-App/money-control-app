import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import BoxGraph from './BoxGraph';
import Dates from './PartsGraph/Dates';
import LinearGraph from './LinearGraph';
import RadialGraph from './RadialGraph';

import './graph.css';

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
            <FormControl component='fieldset' onChange={handleChangeDataType}>
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
              activeClassName='active-link'
              to='/radial'
            >
              Radial
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-link'
              to='/linear'
            >
              Linear
            </NavLink>
            <NavLink
              className='graph-link'
              activeClassName='active-link'
              to='/box'
            >
              Bar
            </NavLink>

            <Route
              className='radial'
              path='/radial'
              component={() => <RadialGraph source={dataType} />}
            />
            <Route
              path='/linear'
              component={() => <LinearGraph source={dataType} />}
            />
            <Route
              path='/box'
              component={() => <BoxGraph source={dataType} />}
            />
          </Router>
        </div>
      </nav>
    </div>
  );
}

export default Graphs;
