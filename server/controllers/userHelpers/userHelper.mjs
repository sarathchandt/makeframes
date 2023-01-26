import bcrypt from 'bcrypt'
import User from '../../model/signupModel.mjs'
import { createJwt } from '../../jwtMiddleware/jwtAuth.mjs'

export function userSignupHlpr({ firstName, lastName, email, password }) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if (!user) {
            let saltRounds = 11;

            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    let userDetails = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hash,
                    })
                    userDetails.save()

                    const token = createJwt({
                        email: email,
                        password: password
                    })
                    let isUser = {
                        is: false,
                        token: token
                    }
                    resolve(isUser)
                });
            });
        } else {
            let isUser ={
              is:true  
            } 
            resolve(isUser)
        }
    })
}

export function userLoginHlpr({email,password}){
    let status = {}
    
    return new Promise(async(resolve, reject)=>{
        const user = await User.findOne({email});

        if(!user){
           status.isuser = false
            resolve(status)
        }else{
            console.log(user.password);
            bcrypt.compare(password, user.password, function(err, result) {
                
                if(result){
                    const token = createJwt({
                        email: email,
                        password: password
                    })
                    status.isuser = true
                    status.isPass=true
                    status.token=token
                    resolve(status)
                }else{
                    status.isuser=true
                    status.isPass=false
                    resolve(status)
                }
                console.log(err);
              

            });
        }
    })
}