import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LoginForm from "../components/Login/LoginForm";


function privateRoutes() {
    const [isLogin, setIsLogin] = useState(false)


    useEffect(() => {
        const token = document.cookie
        console.log(token);
        async function datafetch() {
            await axios.post(`${UURL}loginCheck`, { token: token }).then((response) => {
                setIsLogin(response.data.user)
            })
        }
        datafetch();
    }, [])
    return (
       isLogin ? <Outlet/> : <LoginForm/>
    )
}

export default privateRoutes