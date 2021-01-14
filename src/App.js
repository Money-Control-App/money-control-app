import './css/style.css';
import Charges from './components/Charges';
import { Setting } from './components/Settings/Setting';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    localStorage.setItem('charges',JSON.stringify([]))
  })
  return (
    <div className="App">
      <Charges />
      <Setting />
    </div>
  );
}

export default App;
