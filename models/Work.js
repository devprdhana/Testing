const mongoose = require('mongoose')
const { schema } = require('./User')

const Schema = mongoose.Schema

const workSchema = schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    keywords:[{
        type:String
    }],
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})



module.exports = mongoose.model("Work",workSchema)