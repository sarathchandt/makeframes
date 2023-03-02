import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import LandingHome from './pages/adminHome'

function App() {

  return (
    <div >
      <Router>
        <Routes>

       <Route element = {<LandingHome/>} path = '/'/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
