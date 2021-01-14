import logo from "./logo.svg";
import "./App.css";
import Charges from "./components/Table/Charges";
import Incomes from "./components/Table/Incomes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem("charges", JSON.stringify([]));
  });
  return (
    <div className="App">
      <Charges />
      <Incomes />
    </div>
  );
}

export default App;
