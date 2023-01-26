import express from "express";
import {userSignup, userLogin} from '../controllers/userControllers.mjs'
import {authenticateToken} from "../jwtMiddleware/jwtAuth.mjs"

const router = express.Router();







router.route('/signup')
        .post(userSignup);


router.route('/login')
        .post(userLogin)
        .get(authenticateToken)





        
        
        
        






export default router