import React,{useEffect,useState} from 'react'
// import store from '../../app/store.mjs';
// import {checkActions} from '../../slices/checkLogin.mjs'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UURL } from '../../API/apiCall';
import Header from '../components/Home/Header'
import LoginForm from "../components/Login/LoginForm";
import Footer from '../components/Footer/Footer'
import LandingHome from '../components/landingHome/landingHome'

function Login() {

    const[isLogin,setIsLogin] = useState(false)
      const navigate = useNavigate();
    


    useEffect(()=>{
        const token = document.cookie
        console.log(token);
        async function  datafetch  (){
              console.log('hi');
             await axios.post(`${UURL}loginCheck`,{token:token}).then((response)=>{
                  console.log(response.data.user);
                  setIsLogin(response.data.user)
                  response.data.user?navigate('/'):navigate('/login')
              })
          }
          datafetch();
        },[])

  return (
    <>
       <Header/>
      { isLogin ? <LandingHome/>: <LoginForm/>}
        <Footer/> 
    </>
  )
}

export default Login