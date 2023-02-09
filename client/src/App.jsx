import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup"
import PrivateRoutes from './pages/privateRoutes'
import Profile from './pages/Profile'
import ProfetionalProfile from'./pages/Profetional.jsx'
import AddProgram from './pages/AddPrograms'

function App() {



  return (
    <div >
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route element={<Profile/>} path='/profile' />
            <Route element={<ProfetionalProfile/>} path='/profetionalProfile' />
            <Route element={<AddProgram/>}  path='/addPrograms' />
          </Route>


          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
