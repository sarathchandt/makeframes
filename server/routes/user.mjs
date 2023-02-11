import express from "express";
import { userSignup, userLogin, sendOtp } from '../controllers/userControllers.mjs'
// import {authenticateToken} from "../jwtMiddleware/jwtAuth.mjs"
import { isUser } from '../controllers/userControllers.mjs'
import { checkArtist } from '../controllers/userControllers.mjs'
import {registerArtist, profilePic, bringDp, submitProgram,viewPrograms,takeSingleProgram} from '../controllers/userControllers.mjs'


const router = express.Router();







router.route('/signup')
        .post(userSignup)
router.route('/loginCheck')
        .post(isUser)
router.route('/login')
        .post(userLogin)
router.route('/otp')
        .post(sendOtp)
router.route('/checkArtist')
        .post(checkArtist)
router.route('/registerArtist')
        .post(registerArtist)
router.route('/profilePic')
        .post(profilePic)
router.route('/bringDp')
        .post(bringDp)
router.route('/submitProgram')
        .post(submitProgram)
router.route('/viewPrograms')
        .post(viewPrograms)
router.route('/takeSingleProgram')
        .post(takeSingleProgram)










export default router