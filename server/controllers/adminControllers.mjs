import {GraphData,
    frtchDetails,
    makeLogin,
    takeArtistAdmin,
    artistTakeByRegex,
    blockNow,
    unBlockNow,
    takeProducerAdmin,
    graphBooking} from '../controllers/adminHelpers/adminHealper.mjs'

export function takeGraphUserData(req, res){
    GraphData().then(result=>{
        res.status(200).json(result)
    })
}

export function bookingGraph(req, res){
    graphBooking().then(result=>{
        res.status(200).json(result)
    })
}

export function detailsFetch(req,res){
    
    frtchDetails().then(result=>{
        res.status(200).json(result)
    })
}
export function loginAdmin(req, res){
    makeLogin(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function fetchDetailsOfArtist(req, res){
    takeArtistAdmin().then(result=>{
        res.status(200).json(result)
    })
}
export function takeArtistByRegex(req, res){
    artistTakeByRegex(req.body).then(result=>{
        res.status(200).json(result)
    })
}
export function blockHim(req, res){
    blockNow(req.body).then(result=>{
        res.status(200).json(result)
    })
}

export function unBlockHim(req, res){
    unBlockNow(req.body).then(result=>{
        res.status(200).json(result)
    })
}
export function fetchDetailsOfProducer(req, res){
    takeProducerAdmin().then(result=>{
        res.json(result).status(200)
    })
}