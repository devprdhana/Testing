const User = require("../models/User");
const dotenv = require('dotenv')
const bcryptjs = require('bcryptjs')
dotenv.config()



const userSignup = async(req,res)=>{
    const {email,password,userName,firstName,lastName,profilePicture,tools} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        console.log("User already exists")
    }
    let user;

    const hashedPassword = bcryptjs.hashSync(password)
    try{
        user = User({
            email,password:hashedPassword,userName,firstName,lastName,profilePicture,tools
        })
        user = await user.save()
    }catch(err){
        console.log(err)
    }

    if(!user){
        res.status(500).json({message:"Unexpected error"})
    }
    res.status(201).json({message:"Signup successfull",user})
}


const loginUser = async(req,res)=>{
    const {email,password} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }

    if(!existingUser){
        res.status(404).json({message:"User not found"})
    }

    const correctPassword = bcryptjs.compareSync(password,existingUser.password)

    if(correctPassword){
        res.status(200).json({message:"Login Successfull"})
    }
}


const getUserById = async(req,res)=>{
    const {id} = req.params
    let user;
    try{
        user = await User.findById({_id:id})
    }catch(err){
        console.log(err)
    }

    if(!user){
        res.status(500).json({message:"Internal sever error"})
    }
    res.status(200).json(user)
}

exports.userSignup = userSignup
exports.loginUser = loginUser
exports.getUserById = getUserById