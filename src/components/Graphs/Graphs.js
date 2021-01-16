import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'
import RadialGraph from './RadialGraph'
import '../../css/sourse/graph.css'

function Graphs() {
  return (
    <div className='graph-wrapper'>
      <nav className='graph-nav'>
        <div className='graph-inputs'>
          <div>
            <input type='radio' name='dataType' onClick='' />
            <label htmlFor='dataType'>Income</label>

            <input type='radio' name='dataType' onClick='' />
            <label htmlFor='dataType'>Expenses</label>
          </div>

          <p>Set Dates</p>
        </div>

        <Router >
        
          <NavLink className='graph-link' activeClassName='' to='/radial'>
            Radial
          </NavLink>
          <NavLink className='graph-link' activeClassName='' to=''>
            Linear
          </NavLink>
          <NavLink className='graph-link' activeClassName='' to=''>
            Bar
          </NavLink>

          <Route path='/radial' component={RadialGraph} />
          <Route path='' component='' />
          <Route path='' component='' />
        </Router>
      </nav>
    </div>
  )
}

export default Graphs
