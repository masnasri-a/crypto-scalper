import { useState } from 'react'
import './App.css'
import useMenuStore from './hook/menu'
import Account from './pages/account'
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)
  const { selectedMenu } = useMenuStore()

  return (
    <>
      {
        selectedMenu === 'home'&& (
          <Home />
        )
      }
      {
        selectedMenu === 'user' && (
          <Account />
        )
      }
      
    </>
  )
}

export default App
