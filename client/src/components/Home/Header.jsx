import React from 'react'
import './Header.css'

function  Header() {
  return (
    <>
      <div className='flex flex-nowrap p-2'>
        <p className='green  font-bold' >Make</p>
        <p className='red  font-bold' >frames</p>


        <div className='flex '>
          <p className='pl-8 '>HOME</p>
           <p className='pl-8'>ABOUT US</p>
           <p className='pl-8'>APPROACH PRODUCERS</p>
           <p className='pl-8'>LOGIN</p>
        </div>
      </div>
      
    </>
  )
}

export default Header