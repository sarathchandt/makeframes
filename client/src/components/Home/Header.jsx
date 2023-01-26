import React from 'react'
import './Header.css'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function  Header() {
  return (
    <>



    


      <div className='flex flex-nowrap p-2'>
        <p className='green  font-bold' >Make</p>
        <p className='red  font-bold' >frames</p>

        
        <div className='flex  details ' style={{color:"#3C6255"}} id = "navitems" >
          <p className='pl-8 text-sm'>Home</p>
           <p className='pl-8 text-sm'>About</p>
           <p className='pl-8 text-sm'>Approach Producers</p>
           <p className='pl-8 text-sm'>Login</p>
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