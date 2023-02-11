import User from '../../model/signupModel.mjs'
import Programs from '../../model/programModel.mjs'
import { createJwt, verifyToken } from '../../jwtMiddleware/jwtAuth.mjs'
import { verifyOtp } from '../../nodeMailer/nodeMailer.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export function userSignupHlpr({ firstName, lastName, email, password, otp }) {
    console.log(typeof otp);
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if (!user) {

            verifyOtp(otp).then((result) => {
                if (result.otp == true) {
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
                                token: token,
                                serverOtp: true


                            }
                            resolve(isUser)

                        });
                    });
                } else {
                    let isUser = {
                        is: false,
                        serverOtp: false,
                        token: null
                    }
                    resolve(isUser)
                }
            })

        } else {
            let isUser = {
                is: true,
                token: null,

            }
            resolve(isUser)
        }
    })
}

export function userLoginHlpr({ email, password }) {
    let status = {}

    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email });

        if (!user) {
            status.isuser = false
            resolve(status)
        } else {
            console.log(user.password);
            bcrypt.compare(password, user.password, function (err, result) {

                if (result) {
                    const token = createJwt({
                        email: email,
                        password: password
                    })
                    status.isuser = true
                    status.isPass = true
                    status.token = token
                    resolve(status)
                } else {
                    status.isuser = true
                    status.isPass = false
                    resolve(status)
                }
                console.log(err);


            });
        }
    })
}

export function checkArtistNow(token) {
    return new Promise((resolve, reject) => {

        if (!token) {
            resolve({ token: null })
        } else {
            jwt.verify(token.token, process.env.JWT_SECRET, async (err, user) => {
                if (err) {
                    resolve({ timeOut: true })
                } else {
                    await User.aggregate([
                        { $match: { email: user.email } }, { $match: { isArtist: true } }
                    ]).then((actorCheck) => {

                        actorCheck.length > 0 ? resolve({ timeOut: false, isArtist: true }) : resolve({ timeOut: false, isArtist: false });
                    })


                }
            })
        }
    })

}

export function artistRegister(details) {
    console.log(details, 'referance_id');
    return new Promise((resolve, reject) => {
        if (details.token == null) {
            resolve({ user: false })
        } else {
            jwt.verify(details.token, process.env.JWT_SECRET, async (err, user) => {
                if (err) {
                    resolve({ user: false })
                } else {
                    await User.findById(details.referance_id).then((result) => {
                        console.log(result, 'result');
                        if (!result) {
                            resolve({ referance: false })
                        } else {
                            User.updateOne({ email: user.email }, { $set: { isArtist: true } }).then((result) => {
                                resolve({ referance: true })
                            })
                        }
                    }).catch((err) => {
                        resolve({ referance: false })
                    })
                }
            })
        }
    })

}

export function savePropic(body) {

    return new Promise((resolve, reject) => {
        if (body.token == null) {
            resolve({ token: null })
        } else {
            jwt.verify(body.token, process.env.JWT_SECRET, async (err, user) => {
                if (err) {
                    resolve({ token: false })
                } else {
                    await User.updateOne({ email: user.email }, {
                        $set:
                            { dpimage: body.base64 }
                    }).then(re => {
                        console.log(re);
                    }).catch(err => console.log(err))
                }
            })
        }
    })
}
export function takedp(token) {
    return new Promise((resolve, reject) => {

        jwt.verify(token.token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                resolve({ token: false })
            } else {
                await User.findOne({ email: user.email }
                ).then(re => {
                    resolve(re)
                }).catch(err => {
                    resolve(err)
                })
            }
        })
    })
}
export function submitPgToDB(programDetails) {
    return new Promise(async (resolve, reject) => {
        verifyToken(programDetails.token).then(async (token) => {
            if (token.token) {
                await User.find({ email: token.user.email }).then((result) => {
                    new Programs({
                        name: programDetails.name,
                        selectedDaates: programDetails.selectedDaates,
                        category: programDetails.category,
                        amount: programDetails.amount,
                        description: programDetails.description,
                        imageArray: programDetails.imageArray,
                        vdoFile: programDetails.videoUrl,
                        user: result[0]._id
                    }).save()
                    resolve({ Program: true })
                })
            } else if (token.token == false) {
                resolve({ Program: false })
            } else {
                resolve({ Program: 'exp' })
            }
        })

    })
}

export function viewPr(token) {
    return new Promise((resolve, rejecct) => {
        verifyToken(token.token).then(async (result) => {
            if (result.token) {
                await User.findOne({ email: result.user.email }).then(async (user) => {
                    await Programs.find({ user: user._id }).then(result => {
                        resolve(result)
                    })
                })
            } else {
                resolve({ token: false })
            }
        })
    })

}

export function tekeSingle(id){
    let program = {}
    return new Promise ((resolve, reject)=>{
        if(id==null){
            resolve(program.id=null)
        }else{
            Programs.findOne({_id:id.id}).then(result=>{
                resolve(result)
            })
        }
    })
}