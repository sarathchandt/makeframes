import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect , useState} from 'react'
import axios from 'axios'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup" 
import { UURL } from '../API/apiCall'

function App() {


  
  return (
    <div >
      <Router>  
      <Routes>
        
        <Route exact path='/' element={  <Home/>}/>
        <Route    path='/login' element={<Login/>}/>
        <Route  path='/signup' element={  <Signup/>}/>
        
      
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
