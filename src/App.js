import './css/style.css';
import { Setting } from './components/Settings/Setting';
import { useEffect } from 'react';
import "./App.css";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";

function App() {
  useEffect(() => {
    localStorage.setItem("charges", JSON.stringify([]));
  });
  return (
    <div className="App">
      <Charges />
      <Setting />
      <Incomes />
    </div>
  );
}

export default App;
