import "./css/style.css";
import { Setting } from "./components/Settings/Setting";
import { useEffect } from "react";
import "./App.css";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";
import Graphs from "./components/Graphs/Graphs";
import {Link,NavLink,Route, BrowserRouter as Router  }  from 'react-router-dom';
import NavPanel from "./components/Navigation/NavPanel"
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
      <Graphs />
    </div>
  );
}
export default App;
