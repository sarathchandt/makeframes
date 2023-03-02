import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { UARL } from '../../API/apiCall';
import AdminLanding from './AdminLanding';


function protectedAdminRoute() {

    const [login, setLogin] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const headers = { Authorization: `admin ${token}` };

        axios.get(`${UARL}checkAdminToken`, { headers }).then(res => {
            if (res.data.token) {
                setLogin(false)
            }
        })
    }, [])

    return (
        login ? <Outlet /> : <AdminLanding />
    )
}

export default protectedAdminRoute