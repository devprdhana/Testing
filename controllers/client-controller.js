const Client = require("../models/Client");
const bcryptjs = require('bcryptjs')

const clientSignUp = async(req,res,next) => {
    const {email,password,userName,firstName,lastName,profilePicture,jobs} = req.body
    let existingClient;
    try{
        existingClient = await Client.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existingClient){
        console.log("User already exists")
    }
    let client;

    const hashedPassword = bcryptjs.hashSync(password)
    try{
        client = Client({
            email,password:hashedPassword,userName,firstName,lastName,profilePicture,jobs
        })
        client = await client.save()
    }catch(err){
        console.log(err)
    }
    //Validation
    if(!client){
        res.status(500).json({message:"Unexpected error"})
    }
    res.status(201).json({message:"Signup successfull",client})
}

exports.clientSignUp = clientSignUp