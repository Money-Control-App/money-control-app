import logo from './logo.svg';
import './App.css';
import Charges from './components/Charges'
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    localStorage.setItem('charges',JSON.stringify([]))
  })
  return (
    <div className="App">
      <Charges />
    </div>
  );
}

export default App;
