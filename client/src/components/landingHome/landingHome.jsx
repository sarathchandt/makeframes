import React from 'react'
import './landingHome.css'
import { useNavigate } from 'react-router-dom'

function LandingHome() {

  const navigate = useNavigate()
  return (
    <div  > 
      <div className=''>
        <img src="../../../public/images/heightstour123rnational-tour-company.jpg" className=' mt-5 object-fit w-full h-6/12' alt="" />
        </div>
        <div className='d-flex justify-content-end'>
        <button className=' p-1 m-2 bg-green rounded hover:bg-red' onClick={()=>{navigate('/viewStageProgramUser')}}>Book Stage Shows</button>
        </div>
    
      
    </div>



  )
}

export default LandingHome