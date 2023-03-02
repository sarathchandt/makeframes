import express from "express";
import {
    takeGraphUserData,
    detailsFetch,
    bookingGraph,
    takeArtistByRegex,
    loginAdmin,
    fetchDetailsOfArtist,
    blockHim,
    unBlockHim,
    fetchDetailsOfProducer
} from '../controllers/adminControllers.mjs'
import {verifyTokenAdmin} from '../middleware/jsonWTMiddleWare.mjs'
const router = express.Router()


router.route('/loginAdmin') 
    .post(loginAdmin)
router.route('/checkAdminToken')
    .get(verifyTokenAdmin)

router.route('/takeGraphUserData')
    .get(takeGraphUserData)
router.route('/bookingGraph')
    .get(bookingGraph)
router.route('/detailsFetch')
    .get(detailsFetch)
router.route('/fetchDetailsOfArtist')
    .get(fetchDetailsOfArtist)
router.route('/takeArtistByRegex')
    .post(takeArtistByRegex)
router.route('/blockHim')
    .post(blockHim)
router.route('/unBlockHim')
    .post(unBlockHim)
router.route('/fetchDetailsOfProducer')
    .get(fetchDetailsOfProducer)


export default router