import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx';
import OrgDashboard from './components/OrgDashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/org/dashboard' element={<OrgDashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
