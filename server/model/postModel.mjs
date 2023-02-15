import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    images:{
        type: [],
        require:true
    },
    coments : {
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model('Posts', postSchema);