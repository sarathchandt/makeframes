import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { UURL } from '../../../API/apiCall'
import axios from 'axios'
import "./LoginForm.css"



function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [seePassword, setSeeRePassword] = useState('password')


  const navigate = useNavigate();


  const details = {
    email: email,
    password: password
  }

  const login = (e) => {
    e.preventDefault();
    axios.post(`${UURL}login`, details).then(result => {
      console.log(result.data);
      if (result.data?.token) {
        document.cookie = `${result.data.token}`
        navigate('/')
      } else {
    
        navigate('/login')

      }
    })
  }





  return (
    <div >
      <div className='img bg-darkGreen mb-2 mt-20'>

      <div className='flex justify-center'>
        


        <form action="" onSubmit={login} className=" mt-10"  >
          
            <input type="email" name='email' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' E-mail' required value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <br />
            <input type={seePassword } name='password' className='m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Password' required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            {
                seePassword=='password' ?
              
              <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer" onClick={()=>{setSeeRePassword('text')}}>
                visibility
              </span> :
                
                <span className="material-symbols-outlined relative top-1.5 right-11 cursor-pointer" onClick={()=>{setSeeRePassword('password')}}>
                visibility_off
              </span>
              }
            <br />

            <button type='submit' className=" buttons bg-[#3C6255] hover:bg-[#8C2222] text-white font-bold py-2 px-4 rounded-lg " >
              Login
            </button>
            <p className='mt-9 justify-center cursor' onClick={() => {
              navigate("/signup")
            }}>Don't have an account ? click here to create</p>
        
        </form>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm