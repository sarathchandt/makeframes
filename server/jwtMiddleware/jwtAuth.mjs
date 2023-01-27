import jwt from 'jsonwebtoken'


export const createJwt = (details) => {
    return  jwt.sign(details, process.env.JWT_SECRET, { expiresIn: '10s' });
}

export function authenticateToken(req, res, next) {
    console.log('kkkkkk');

    const token = req.headers.cookie


    console.log(token);

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err, 'error')
        if (err) {
            return res.sendStatus(403)
        } else {
            req.user = user
            next()
        }
    })
}
