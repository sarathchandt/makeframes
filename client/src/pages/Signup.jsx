import React,{useEffect} from 'react'
import Footer from '../components/Footer/Footer'
import SignupForm from '../components/SignupForm/SignupForm'
import Header from '../components/Home/Header'
import axios from 'axios'
import { UURL } from '../../API/apiCall'


function Signup() {

  
     

  return (
    <div>
        <Header/> 
        <SignupForm/> 
        <Footer/>
    </div>
  )
}

export default Signup