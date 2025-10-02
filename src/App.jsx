import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import HomeOut from './components/out/HomeOut'
import { BrowserRouter } from 'react-router-dom'
import RouterOut from './routes/RouterOut'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <RouterOut />
    </BrowserRouter>
  )
}

export default App
