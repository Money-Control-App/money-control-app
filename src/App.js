import './css/style.css';
import './fonts/fonts.css';
import { MainPage } from './components/MainPage/MainPage';
import { Setting } from './components/Settings/Setting';
import { useEffect } from 'react';

import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import NavPanel from './components/Navigation/NavPanel';
import DataAnalysis from './components/DataAnalysis/DataAnalysis.js';
import defaultIncomes from './components/Table/default-incomes';
import defaultIncomeCategories from './components/Table/default-income-categories';
import defaultCharges from './components/Table/default-charges';
import defaultChargeCategories from './components/Table/default-charge-categories';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {

  if (!localStorage.getItem('incomes')) {
    localStorage.setItem('incomes', JSON.stringify(defaultIncomes));
  }

  if (!localStorage.getItem('charges')) {
    localStorage.setItem('charges', JSON.stringify(defaultCharges));
  }

  if (!localStorage.getItem('incomeCategories')) {
    localStorage.setItem(
      'incomeCategories',
      JSON.stringify(defaultIncomeCategories),
    );
  }

  if (!localStorage.getItem('chargeCategories')) {
    localStorage.setItem(
      'chargeCategories',
      JSON.stringify(defaultChargeCategories)
    );
  }

  return (
    <div className='App'>
      <Router>
        <NavPanel />
        <Switch>
          <Route exact path='/data-analysis' component={DataAnalysis} />
          <Route exact path='/setting' component={Setting} />
          <Route exact path='/' component={MainPage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
