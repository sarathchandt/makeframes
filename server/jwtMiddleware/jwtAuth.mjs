import jwt from 'jsonwebtoken'


export const createJwt = (details) => {
    return  jwt.sign(details, process.env.JWT_SECRET, { expiresIn: '60d'  });
}

export function authenticateToken(req, res, next) {
    const token = req.headers.cookie
  
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      
        if (err) {
            return res.sendStatus(403)
        } else {
            req.user = user    
            next()
        } 
           
    }) 
}  
export function verifyToken(token){
    return new Promise((resolve, reject)=>{
        let tokenDetails = {}
        if (token == null) resolve(tokenDetails.token=false);
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          
            if (err) {
                resolve(tokenDetails.token='timeOut')
            } else {
                tokenDetails.token=true;
                tokenDetails.user=user
                resolve(tokenDetails)
            } 
               
        }) 
    })
   
}