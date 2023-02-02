import jwt from 'jsonwebtoken'
import {sendOtpMessage} from '../nodeMailer/nodeMailer.mjs'

import {
    userSignupHlpr,
    userLoginHlpr
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {

        userSignupHlpr(req.body).then((response) => {
            console.log(response);
            res.status(201)
                .json(response)  
        })
}

export function isUser(req, res) { 
    console.log(req.body);
    console.log('kkk');
    const token = req.body.token
    console.log(token);
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
            if(result.isUser && result.isPass){
                req.user = true
            }
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