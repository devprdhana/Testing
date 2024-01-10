const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true
    },
    tools:[{
        type:String
    }],
    proofofWork:[{
        type:mongoose.Types.ObjectId,
        ref:"Work"
    }],
    appliedJobs:[{
        type:mongoose.Types.ObjectId,
        ref:"Job"
    }],
    userLocation:[{
        type:String
    }]
})

module.exports = mongoose.model("User",userSchema)