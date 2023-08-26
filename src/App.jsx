
import { useState } from 'react'
import './App.css'
import HomePage from './HomePage'
import Login from './Login/Login'

function App() {

  const[loginIsShown,setLoginIsShown] = useState(false);

  const showLoginHandler = () => {
    setLoginIsShown(true);
  }

  const hideLoginHandler = () => {
    setLoginIsShown(false)
  }

  return (
  <>
    {loginIsShown && <Login onClose={hideLoginHandler}/>}
    <HomePage onShowLogin={showLoginHandler}/>
  </>
  )
}

export default App
