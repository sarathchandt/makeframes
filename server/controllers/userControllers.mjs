import { response } from "express";
import {
    userSignupHlpr,
    userLoginHlpr
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {
    userSignupHlpr(req.body).then((response) => {
        console.log(response);
        res
            .status(200)
            .json(response)
    })

}

export function userLogin(req, res) {
    userLoginHlpr(req.body).then((result)=>{
        res
            .status(200)
            .json(result)
    })
}


