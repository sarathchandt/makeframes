import jwt from 'jsonwebtoken'
import {sendOtpMessage} from '../nodeMailer/nodeMailer.mjs'
import User from '../model/signupModel.mjs'

import {
    checkArtistNow,
    userSignupHlpr,
    userLoginHlpr,
    artistRegister
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {
    console.log(req.body,'jjjjjj');
        userSignupHlpr(req.body).then((response) => {
            res
            .status(201)
            .json(response)  
        })
}

export function isUser(req, res) { 
   
    const token = req.body.token
    if (token == null) { 
        res.json({ user: false })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                res.json({ user: false })
            } else { 
                await User.findOne({email:user.email}).then((result)=>{
                    res.json({ user: true, firstName:result.firstName, lastName:result.lastName }) 
                })
 
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
        res
        .status(200)
        .json(result)
    })
}

export function checkArtist(req,res){
    checkArtistNow(req.body).then((result)=>{
        res
        .status(200)
        .json(result)
    })
}

export function registerArtist(req,res){
    artistRegister(req.body).then((result)=>{
        res
        .status(200)
        .json(result)
    })
}