import React from 'react'
import { useNavigate } from "react-router-dom";
import './Header.css'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function  Header() {

  const navigate = useNavigate();
  return (
    <>



    


      <div className='flex flex-nowrap p-2'>
        <p className='green  font-bold' >Make</p>
        <p className='red  font-bold' >frames</p>

        
        <div className='flex  details cursor ' style={{color:"#3C6255"}} id = "navitems" >
          <p className='pl-8 text-sm cursor' onClick={()=>{   
             navigate("/")
             }}>Home</p>
           <p className='pl-8 text-sm cursor'  onClick={()=>{   
             navigate("/")
             }}>About</p>
           <p className='pl-8 text-sm cursor'>Approach Producers</p>
           <p className='pl-8 text-sm cursor'  onClick={()=>{   
             navigate("/login")
             }}>Login</p>
        </div> 
        <div className='details toggle'>
      <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        </div>
      </div>
      
     
      

      
    </>
  )
}

export default Header