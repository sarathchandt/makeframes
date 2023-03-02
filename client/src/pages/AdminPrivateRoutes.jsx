import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { Outlet } from "react-router-dom";
import { UARL } from '../../API/apiCall';
import Login from './AdminLogin'
function AdminPrivateRoutes() {

    const [login, setLogin] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('adminToken');
        const headers = { Authorization: `admin ${token}` };

        axios.get(`${UARL}checkAdminToken`,{ headers }).then(res=>{
                if(res.data.token){
                    setLogin(true)
                }
        })
    },[])

  return (
    login ? <Outlet/> : <Login/> 
  )
}

export default AdminPrivateRoutes