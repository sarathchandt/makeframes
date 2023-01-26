import React, {  useState,useEffect} from 'react'
import {UURL} from '../../../API/apiCall'
import axios from 'axios'
import "./SignupForm"


function SignupForm() {

  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  

  const details = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:password,
  }
 



  const signup=(e)=>{
    
    e.preventDefault();
    console.log(UURL);
    axios.post(`${UURL}signup`,details).then(result=>{
      console.log(result.data);
      if(!result.data.is){
        localStorage.setItem('jwt',result.data.token)
      }else{
        
        console.log('not ok');
      }
    }).catch(err=>{
      log(err)
    })
  }  



  return (
    <div>
            <div className='img mb-5'></div>


<div className='flex justify-center'>

        <div>
          <form action=""   onSubmit={signup} >
            <div>
            <input type="text" name='firstName' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' First Name' value={firstName} required onChange={(e)=>{
              setFirstName(e.target.value)
            }} />
            <br />
            <input type="text" name='lastName' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Second Name' value={lastName} required onChange={(e)=>{
              setLastName(e.target.value)
            }} />
            <br />
            <input type="email" name='email' className=' m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' E-mail' value={email} required onChange={(e)=>{
              setEmail(e.target.value)
            }} />
            <br />
            <input type="password" name='password' className='m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Password' value={password} required onChange={(e)=>{
              setPassword(e.target.value)
            }} />
            <br />
            <input type="password" name='rePassword' className='m-3 email w-max   border-4 rounded-lg bg-black ' placeholder=' Re-enter Password' value={rePassword} required onChange={(e)=>{
              setRePassword(e.target.value)
            }} />
            <br />

            <button type='submit'  className =" buttons bg-green hover:bg-red text-white font-bold py-2 px-4 rounded-lg "   >
              Signup
            </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignupForm