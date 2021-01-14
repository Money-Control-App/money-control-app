<<<<<<< HEAD
import './css/style.css';
import Charges from './components/Charges';
import { Setting } from './components/Settings/Setting';
import { useEffect } from 'react';
=======
import logo from "./logo.svg";
import "./App.css";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";
import { useEffect } from "react";
>>>>>>> ae8a6134a3df54b7568d4ac6b3cb1bd4f774088e

function App() {
  useEffect(() => {
    localStorage.setItem("charges", JSON.stringify([]));
  });
  return (
    <div className="App">
      <Charges />
<<<<<<< HEAD
      <Setting />
=======
      <Incomes />
>>>>>>> ae8a6134a3df54b7568d4ac6b3cb1bd4f774088e
    </div>
  );
}

export default App;
