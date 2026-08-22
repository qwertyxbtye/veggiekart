import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Outlet } from 'react-router-dom'
import { VeggieChatbot } from './components/VeggieChatbot'




function App() {
  const [login, setLogin] = useState(false)

  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
      <VeggieChatbot/>
    </>
  )
}

export default App
