import './css/style.css'
import { Setting } from './components/Settings/Setting'
import { useEffect } from 'react'
import './App.css'
import Charges from './components/Table/Charges'
import Incomes from './components/Table/Incomes'
import Graphs from './components/Graphs/Graphs'

function App() {
  useEffect(() => {
    localStorage.setItem('charges', JSON.stringify([]))
  })
  return (
    <div className='App'>
      <Charges />
      <Incomes />
      <Setting />
      <Graphs />
    </div>
  )
}

export default App
