import jwt from 'jsonwebtoken'


export const createJwt=(details)=>{
    return jwt.sign(details, process.env.JWT_SECRET, { expiresIn: '100s' });
}

export function authenticateToken(req, res, next) {
console.log('kkkkkk');

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      console.log(user,"llllllllllllllll");

      next()
    })
  }
  