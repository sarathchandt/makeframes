import React, { useState, useEffect } from 'react'
import "./LoginForm.css"



function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  


  return (
    <div >
      <div className='img mb-5'></div>
      <div className='flex justify-center'>

        <div>
          <form action=""   >
            <div>
            <input type="email" name='email' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' E-mail' required value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <br />
            <input type="password" name='password' className='m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Password' required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <br />

            <button class=" buttons bg-[#3C6255] hover:bg-[#8C2222] text-white font-bold py-2 px-4 rounded-lg " >
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