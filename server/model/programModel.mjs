import mongoose, { Schema } from "mongoose";



const programSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },
    selectedDaates: {
        type: [],
        require: true
    },
    category: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        require: true
    },
    imageArray: {
        type: [], 
        require: true
    },
    vdoFile: {
        type: String,
        require: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    }
   
})

export default mongoose.model('Programs',programSchema)