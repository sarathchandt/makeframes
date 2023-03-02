import React from 'react'
import SideBar from '../components/AdminSideBar/adminSideBar'
import AdminHeader from '../components/Home/adminHeader'
import AdminLoginHere from '../components/LoginPage/loginPage'

function adminLoding() {
  return (
    <div  className='relative'>
          <div className='fixed top-0 left-0 right-0'>
        <AdminHeader  />
        </div>
        <div className='d-md-block d-none'>
        <SideBar/>
        </div>
        <AdminLoginHere />

    </div>
  )
}

export default adminLoding