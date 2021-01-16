import './css/style.css';
import {Link,NavLink,Route, BrowserRouter as Router  }  from 'react-router-dom';
import { Setting } from './components/Settings/Setting';
import { useEffect } from 'react';
import "./App.css";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";
import NavPanel from "./components/Navigation/NavPanel.js"

function App() {
  useEffect(() => {
    localStorage.setItem("charges", JSON.stringify([]));
  });
  return (
    <div className="App">
      <Router>
        <NavPanel />

        {/* <Route path="/home" component={Home} />
        <Route path="/categories" component={Categories}/>
        <Route path="/dataanalysis" component={dataAnalysis}/> */}
      </Router>


      <Charges />
      <Incomes />
      <Setting />
    </div>
  );
}

export default App;
