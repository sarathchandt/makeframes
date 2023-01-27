import jwt from 'jsonwebtoken'

import {
    userSignupHlpr,
    userLoginHlpr
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {
    if (!req.user) {
        userSignupHlpr(req.body).then((response) => {
            console.log(response, "0000000101");
            jwt.verify(response.token, process.env.JWT_SECRET, (err, user) => {
                console.log(err, 'error')
                if (err) {
                    return res.sendStatus(403)
                } else {
                    req.user = user

                }
            })
            console.log(req.user, 'user');
            console.log(response);
            res
                .status(200)
                .json(response)
        })
    } else {

    }
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


