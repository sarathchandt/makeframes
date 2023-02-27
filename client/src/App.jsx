import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup"
import PrivateRoutes from './pages/PrivateRoutes';
import Profile from './pages/Profile';
import ProfetionalProfile from'./pages/Profetional.jsx';
import AddProgram from './pages/AddPrograms';
import ViewPrograms from './pages/Viewprograms.jsx';
import ViewSingleProgram from './pages/ViewSingleProgram';
import ViewStageProgramUser from "./pages/ViewStageProgramUser";
import ViewProgramDetails from './pages/ViewProgramDetails';
import ViewBookedProgram from './pages/viewUserBooked';
import ViewHostBooking from './pages/ViewHostBooking';
import ViewMap from './pages/ViewMap' 
import UserPageForProfile from './pages/userProfilePageView'
import ChatUserBox from './pages/chatPage'


function App() {



  return (
    <div >
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route element={<Profile/>} path='/profile' />
            <Route element={<ProfetionalProfile/>} path='/profetionalProfile' />
            <Route element={<AddProgram/>}  path='/addPrograms' />
            <Route element={<ViewPrograms/>} path='/viewPrograms' />
            <Route element={<ViewSingleProgram/>} path = '/viewSingleProgram'/>
            <Route element={<ViewStageProgramUser/>} path='/viewStageProgramUser'/>
            <Route element={<ViewProgramDetails/>} path = '/viewProgramDetails'/>
            <Route element={<ViewBookedProgram/>} path='/viewBookedProgram'/>
            <Route element={<ViewHostBooking/>}  path ="/viewHostBook"/>
            <Route element={<ViewMap/>} path={'/viewMap'} />
            <Route element={<UserPageForProfile/>} path={'/UserPageForProfile'}/>
            <Route element={<ChatUserBox/>} path = {'ChatUserBox'}/>
            
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
