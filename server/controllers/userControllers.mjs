import jwt from 'jsonwebtoken'
import {sendOtpMessage} from '../nodeMailer/nodeMailer.mjs'

import {
    userSignupHlpr,
    userLoginHlpr
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {
    console.log(req.body,'jjjjjj');
        userSignupHlpr(req.body).then((response) => {
            res.status(201).json(response)  
        })
}

export function isUser(req, res) { 
   
    const token = req.body.token
    if (token == null) { 
        res.json({ user: false })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.json({ user: false })
            } else { 
                res.json({ user: true }) 
 
            }
        })
    }
}

export function userLogin(req, res) {
        userLoginHlpr(req.body).then((result) => {
            res
            .status(200)
            .json(result)  
        })
}


export  function sendOtp(req,res){
    sendOtpMessage(req.body.email).then((result)=>{
        res.status(200).json(result)
    })
}