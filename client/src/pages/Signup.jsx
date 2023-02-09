import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import SignupForm from '../components/SignupForm/SignupForm'
import Header from '../components/Home/Header'
import axios from 'axios'
import { UURL } from '../../API/apiCall'
import LoginForm from "../components/Login/LoginForm";



function Signup() {

  const[isLogin,setIsLogin] = useState(false)
  const navigate = useNavigate();



useEffect(()=>{
    const token = document.cookie
    console.log(token);
    async function  datafetch  (){
         await axios.post(`${UURL}loginCheck`,{token:token}).then((response)=>{
              setIsLogin(response.data.user)
              response.data.user?navigate('/'):navigate('/signup')
          })
      }
      datafetch();
    },[])
     

  return (
    <div>
        <Header/>
       { isLogin ? <LoginForm/> :<SignupForm/>} 
      
    </div>
  )
}

export default Signup