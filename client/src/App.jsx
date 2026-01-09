import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Index from './Views/Index'
import NavBar from './Components/NavBar/Nav'
import BasicContact from './Views/BasicContact'

const App = () => {


  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route path="/basic-contact" element={<BasicContact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
