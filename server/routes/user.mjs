import express from "express";
import {userSignup, userLogin} from '../controllers/userControllers.mjs'
// import {authenticateToken} from "../jwtMiddleware/jwtAuth.mjs"
import {isUser} from '../controllers/userControllers.mjs'

const router = express.Router();







router.route('/signup')
        .post(userSignup)
      
router.route('/loginCheck')
        .post(isUser)

router.route('/login')
        .post(userLogin)
       





        
        
        
        






export default router