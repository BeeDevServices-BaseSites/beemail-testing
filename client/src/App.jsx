import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Index from './Views/Index'
import NavBar from './Components/NavBar/Nav'
import Contact from './Views/Contact'

const App = () => {


  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
