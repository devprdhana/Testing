
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workSchema = new Schema({
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