import jwt from 'jsonwebtoken';


export function verifyToken(req, res, next) {

    if (!req.body.token) {
        res.status(400).json({ token: false })
    } else {
        jwt.verify(req.body.token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ token: false })

            } else {
                res.locals.userId = data.email
                next()
            }
        })
    }


}

export function verifyTokenHeader(req, res, next) {

    if (!req.headers.cookie ) {
        res.status(400).json({ token: false })
    } else {
        jwt.verify(req.headers.cookie, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ token: false })
            } else {
                res.locals.userId = data.email
                next()
            }
        })
    }




}
export function verifyTokenAdmin(req, res, next) {
    let token = req?.headers?.authorization?.split(' ')[1]
    console.log(req.headers);
    if (token===null) {
        res.status(400).json({ token: false })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                
                res.status(400).json({ token: false })
            } else {
                res.status(200).json({ token: true })
                next()
            }
        })
    }

    


}