import "./css/style.css";
import './fonts/fonts.css';
import { MainPage } from './components/MainPage/MainPage';
import { Setting } from "./components/Settings/Setting";
import { useEffect } from "react";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";
import Graphs from "./components/Graphs/Graphs";
import { Link, NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NavPanel from "./components/Navigation/NavPanel"
import Tabs from './components/Tabs/Tabs.js'

function App() {
  if (!localStorage.getItem("incomes")) {
    localStorage.setItem(
      "incomes",
      JSON.stringify([
        {
          category: "Salary",
          money: "9999",
          description: "",
          date: "05/01/2021",
          key: "05Salary9999",
        },
        {
          category: "Investments",
          money: "250",
          description: "Bitcoin",
          date: "07/01/2021",
          key: "07Investments250"
        },
        {
          category: "Rental",
          money: "400",
          description: "",
          date: "03/01/2021",
          key: "03Rent400"
        },
        {
          category: "Investments",
          money: "120",
          description: "Netflix",
          date: "10/01/2021",
          key: "10Investments120"
        },
        {
          category: "Salary",
          money: "745",
          description: "Side project",
          date: "11/01/2021",
          key: "11Salary745",
        }
      ])
    );
  }

  if (!localStorage.getItem("charges")) {
    localStorage.setItem(
      "charges",
      JSON.stringify([
        {
          category: "Health",
          money: "14",
          description: "Headache tablets",
          date: "01/01/2021",
          key: "01Health14",
        },
        {
          category: "Food",
          money: "35",
          description: "Pickles",
          date: "01/01/2021",
          key: "01Food35",
        },
        {
          category: "Travel",
          money: "400",
          description: "Tickets to Mexico",
          date: "15/01/2021",
          key: "15Health400",
        },
        {
          category: "Food",
          money: "140",
          description: "Dumplings",
          date: "03/01/2021",
          key: "03Health140",
        },
        {
          category: "Health",
          money: "215",
          description: "Cough syrup",
          date: "08/01/2021",
          key: "08Health215"
        }
      ])
    );
  }

  if (!localStorage.getItem("incomeCategories")) {
    localStorage.setItem(
      "incomeCategories",
      JSON.stringify([
        {
          categoryId: 1,
          name: "Salary",
        },
        {
          categoryId: 2,
          name: "Investments",
        },
        {
          categoryId: 3,
          name: "Rental",
        },
      ])
    );
  }

  if (!localStorage.getItem("chargeCategories")) {
    localStorage.setItem(
      "chargeCategories",
      JSON.stringify([
        {
          categoryId: 1,
          name: "Health",
        },
        {
          categoryId: 2,
          name: "Food",
        },
        {
          categoryId: 3,
          name: "Travel",
        },
      ])
    );
  }




  return (
    <div className="App">
      <Router>
        <NavPanel />
        <Switch>
          <Route exact path='/data-analysis' component={Tabs} />
          <Route exact path='/setting' component={Setting} />
          <Route exact path={'/'} component={MainPage} />

           <Route path='/data-analysis/chargetable'  component={Charges}/>
        <Route path='/data-analysis/:chargeincomes' component={Incomes}/>
        <Route path='/data-analysis/:chargegraphic'  component={Graphs}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
