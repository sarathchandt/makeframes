import User from '../../model/signupModel.mjs'
import Programs from '../../model/programModel.mjs'
import Posts from '../../model/postModel.mjs'
import Booking from '../../model/bookingModel.mjs'
import Chat from '../../model/chatSchema.mjs'
import { createJwt } from '../../middleware/jwtAuth.mjs'
import { verifyOtp } from '../../nodeMailer/nodeMailer.mjs'
import bcrypt from 'bcrypt'
import { message } from '../userControllers.mjs'



export function userSignupHlpr({ firstName, lastName, email, password, otp }) {
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

export function checkArtistNow(email) {
    return new Promise(async (resolve, reject) => {
        await User.aggregate([
            { $match: { email: email } }, { $match: { isArtist: true } }
        ]).then((actorCheck) => {
            actorCheck.length > 0 ? resolve({ timeOut: false, isArtist: true }) : resolve({ timeOut: false, isArtist: false });
        })

    })

}

export function artistRegister(details, email) {
    return new Promise(async (resolve, reject) => {
        await User.updateOne({ email: email }, { $set: { isArtist: true, about: details.about, domain: details.domain } }).then(() => {
            resolve({ artistDone: true })
        })
    })

}

export function savePropic(body, email) {
    return new Promise(async (resolve, reject) => {
        await User.updateOne({ email: email }, {
            $set:
                { dpimage: body.image }
        }).then(re => {
            resolve({ add: true })
        }).catch(err => console.log(err))

    })
}


export function takedp(email) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }
        ).then(res => {
            resolve(res)
        }).catch(err => {
            resolve(err)
        })

    })
}
export function submitPgToDB(programDetails, email) {
    return new Promise(async (resolve, reject) => {
        await User.find({ email: email }).then((result) => {
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
        }).catch(err => resolve({ Program: false }))
    })
}

export function viewPr(email) {
    return new Promise(async (resolve, rejecct) => {
        await User.findOne({ email: email }).then(async (user) => {
            await Programs.find({ user: user._id }).then(result => {

                resolve(result)
            })
        })

    })

}

export function tekeSingle(objid) {
    return new Promise(async (resolve, reject) => {
        if (objid == null) {
            resolve({ id: null })
        } else {
            await Programs.findOne({ _id: objid.id }).then(result => {
                resolve(result)
            }).then(err => resolve({ Program: false }))
        }
    })
}

export function addPosts(body, email) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(res => {
            new Posts({
                images: body.images,
                coments: body.coments,
                user: res._id
            }).save()
            resolve({ posted: true })
        })

    })
}

export function pickPostsDb(email, page) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(user => {
            Posts.find({ user: user._id }).limit(9 * page).then(res => {

                resolve(res)
            })
        })

    })
}

export function bringPsts(email) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(async (res) => {
            await Programs.find({ user: { $ne: res._id } }).then(Programs => {
                resolve(Programs)
            })
        })

    })
}

export function takeOnePg(id) {
    return new Promise((resolve, reject) => {
        Programs.findById(id.id).then(result => {
            resolve(result)
        })
    })
}

export function bookPg(bookingDetatils, email) {
    let booking = { ...bookingDetatils, userID: email }
    return new Promise((resolve, reject) => {
        Programs.findOneAndUpdate({ _id: booking.program_id }, { $inc: { bookingCount: 1 } }, { new: true }, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        })
        new Booking(booking).save().then(res => {
            resolve({ booked: true })
        })
    })
}

export function takeBookedPg(email) {
    return new Promise((resolve, reject) => {
        Booking.find({ userID: email }).sort({ date: 1 }).populate('program_id').then(res => {
            resolve(res)
        })
    })
}

export function takeHostBooking(id) {
    return new Promise((resolve, reject) => {
        let bookings = {}
        let pending = []
        let accepted = []
        let history = []
        Booking.find({ program_id: id.id, isAccepted: false, rejected: false }).sort({ date: 1 }).then(res => {
            res.forEach(result => {
                if (new Date(result.date) > new Date()) {
                    pending.push(result)
                }
            })
            bookings.pend = pending
            Booking.find({ program_id: id.id, isAccepted: true }).sort({ date: 1 }).then(res => {
                res.forEach(result => {
                    if (new Date(result.date) > new Date()) {
                        accepted.push(result)
                    }
                })
                bookings.acc = accepted
                Booking.find({ program_id: id.id, }).sort({ date: 1 }).then(res => {
                    res.forEach(result => {
                        if (new Date(result.date) < new Date()) {
                            history.push(result)
                        }
                    })
                    bookings.his = history
                    resolve(bookings)
                })
            })
        })
    })
}

export function programReject(id) {
    return new Promise((resolve, reject) => {
        Booking.findById(id.id).then(res => {
            Programs.findOneAndUpdate({ _id: res.program_id }, { $inc: { bookingCount: -1 } }, { new: true }, (err, data) => {
                if (err) console.log(err);
                console.log(data);
            })
        })
        Booking.updateOne({ _id: id.id }, { $set: { rejected: true } }).then(res => {
        })
        resolve({ reject: true })
    })
}

export function programAccept(id) {
    return new Promise((resolve, reject) => {
        Booking.findById(id.id).then(res => {
            let date = new Date(res.date)
            Programs.findOneAndUpdate({ _id: res.program_id }, { $push: { selectedDaates: date } })
            Programs.findOneAndUpdate({ _id: res.program_id }, { $inc: { bookingCount: -1 } }, { new: true }, (err, data) => {
                if (err) console.log(err);
                console.log(data);
                Booking.updateMany({ date: res.date }, { $set: { rejected: true } }).then(() => {
                    Booking.updateOne({ _id: id.id }, { $set: { isAccepted: true, rejected: false } }).then(() => {
                        resolve({ accepted: true })
                    })
                })
            })


        })


    })
}

export function usersFetch(email) {
    return new Promise((resolve, reject) => {
        User.find({ email: { $ne: email } }).sort({ hypeCount: -1 }).then(res => {
            resolve(res)
        })
    })


}

export function userDataFetch(id) {
    return new Promise((resolve, reject) => {
        User.findById(id.id).then(res => {
            resolve(res)
        })
    })
}

export function postsForUser(id) {
    return new Promise((resolve, reject) => {
        Posts.find({ user: id.id }).sort({ createdAt: -1 }).then(res => {
            resolve(res)
        })
    })
}

export function chat(content) {
    return new Promise(async (resolve, reject) => {
        const { from, to, message } = content;
        const newMessage = await Chat.create({
            message: message,
            chatUsers: [from, to],
            sender: from
        })  
        resolve(newMessage)
    })
}

export function takeChat(body) {
    
    return new Promise(async (resolve, reject) => {
        let newMessages = []
        const from = body.userid1;
        let to  = body.userid2
       
        await Chat.find({
            chatUsers: {
                $all: [from, to]
            }
        }).sort({ updateAt: 1 }).then(messages => {
            messages.map(msg => {
                newMessages.push({
                    myself: msg.sender.toString() === from,
                    message: msg.message,
                    hr:msg.updatedAt.getHours(),
                    min:msg.updatedAt.getMinutes()
                })
            })
            resolve(newMessages)
        })

    })
}

export function takePeopleMessage(id, email) {
     return new Promise((resolve, reject) => {
        User.findOne({ email: email, MessagedPeople: id.toId }).then(res => {
            if (!res) {
                User.findOneAndUpdate({ email: email }, { $push: { MessagedPeople: id.toId } }).then(result => {
                    resolve(result)
                }).catch((error) => { console.log(error, "error"); })
            } else {
                resolve(res)
            }

        })
    })
}

export function takeUsersChat(idArr) {
    return new Promise(async (resolve, reject) => {
        var arr = [];
        
        for (let i = 0; i < idArr.people.length; i++) {
            
            await User.findOne({ _id: idArr.people[i] }).then(res => {
                arr.unshift(res)
                if (arr.length == idArr.people.length) {
                    resolve(arr)
                }

            })
        }
    })
}