const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String
    },
    requiredSkills:[{
        type:String
    }],
    paymentOneTime:{
        type:Boolean
    },
    paymentOngoing:{
        type:Boolean
    },
    oneTime:[{
        type:String
    }],
    Ongoing:[{
        type:String
    }],
    client:{
        type:mongoose.Types.ObjectId,
        ref:"Client"
    },
    appliedUsers:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Job",jobSchema)