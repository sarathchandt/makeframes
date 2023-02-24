import express from "express";
import { userSignup, userLogin, sendOtp } from '../controllers/userControllers.mjs'
// import {authenticateToken} from "../jwtMiddleware/jwtAuth.mjs"
import { isUser } from '../controllers/userControllers.mjs'
import { checkArtist } from '../controllers/userControllers.mjs'
import {registerArtist,
         profilePic,
          bringDp, 
          submitProgram,
          viewPrograms,
          takeSingleProgram,
          addPost,
          pickPosts,
          bringAllpost,
          fetchOneProgramBook,
          fettchBookedPg,
          takeBookingForHost,
          rejectProgram,
          acceptProgram,
          fetchUsers,
          bookProgram} from '../controllers/userControllers.mjs'

import {verifyToken,verifyTokenHeader} from '../middleware/jsonWTMiddleWare.mjs'

const router = express.Router();







router.route ('/signup')
        .post(userSignup)
router.route ('/login')
        .post(userLogin)
router.route ('/otp')
        .post(sendOtp)
        
router.route ('/loginCheck')
        .post(verifyToken,isUser)
router.route ('/checkArtist')
        .post(verifyToken,checkArtist)
router.route ('/registerArtist')
        .post(verifyToken,registerArtist)
router.route ('/profilePic')
        .post(verifyToken,profilePic)
router.route ('/bringDp')
        .post(verifyToken,bringDp)
router.route ('/submitProgram')
        .post(verifyToken,submitProgram)
router.route ('/viewPrograms')
        .post(verifyToken,viewPrograms)
router.route ('/takeSingleProgram')
        .post(verifyToken,takeSingleProgram)
router.route ('/addPost')
        .post(verifyToken,addPost)
router.route ('/pickPosts')
        .post(verifyToken,pickPosts)
router.route ('/bringAllpost')
        .post(verifyToken,bringAllpost)
router.route ('/fetchOneProgramBook')
        .post(verifyToken,fetchOneProgramBook)
router.route ('/bookProgram')
        .post(verifyToken,bookProgram)
router.route ('/fetchBookedPg')
        .post(verifyToken,fettchBookedPg)
router.route ('/checkBookingHost')
        .post(verifyTokenHeader,takeBookingForHost)
router.route ('/rejectProgram')
        .post(verifyTokenHeader,rejectProgram)
router.route ('/acceptProgram')
        .post(verifyTokenHeader,acceptProgram)
router.route ('/fetchUsers')
        .get(verifyTokenHeader,fetchUsers)



export default router