import React, { useState, useEffect } from 'react'
import { UURL } from '../../../API/apiCall'
import axios  from 'axios'
import "./LoginForm.css"



function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const details = {
    email:email,
    password:password
  }

  const login=(e)=>{
    e.preventDefault();
    axios.post(`${UURL}login`,details).then(result=>{
      console.log(result.data);
      if(result.data?.token){
        document.cookie = `token=${result.data.token}`
            }else{
        console.log('okkkk');
      }
    })
  }


  


  return (
    <div >
      <div className='img mb-5'></div>
      <div className='flex justify-center'>

        <div>
          <form action="" onSubmit={login}  >
            <div>
            <input type="email" name='email' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' E-mail' required value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <br />
            <input type="password" name='password' className='m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Password' required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <br />

            <button type='submit' className=" buttons bg-[#3C6255] hover:bg-[#8C2222] text-white font-bold py-2 px-4 rounded-lg " >
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm