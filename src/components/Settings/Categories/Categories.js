
import { Header } from '../PartsForm/Header';
import { ShowCategories } from './ShowCategories';
import { Link, NavLink, BrowserRouter as Router, Route, Switch } from "react-router-dom";


export const Categories = () => {
    return (
        <div>
            <Header>Categories</Header>
            <Router>
      <nav className={`nav-setting nav-tables`}>
        <NavLink to="/setting/categories/charges" className="nav-setting-link" activeClassName="active-link-s">
          Charges
        </NavLink>
        <NavLink to="/setting/categories/incomes" className="nav-setting-link" activeClassName="active-link-s">
          Incomes
        </NavLink>
      </nav>
      <Switch>
        <Route exact path={'/setting'}>
            <ShowCategories title='income' key={2}/>
        </Route>
        <Route exact path='/setting/categories/charges'>
            <ShowCategories title='charge' key={1}/>
        </Route>
        <Route exact path='/setting/categories/incomes'>
            <ShowCategories title='income' key={2}/>
        </Route>
      </Switch>
    </Router>
        </div>
    )
}