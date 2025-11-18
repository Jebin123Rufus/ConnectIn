import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/landing' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
