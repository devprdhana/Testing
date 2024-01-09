const passport = require("passport");
const User = require("../models/User");
const dotenv = require('dotenv')
dotenv.config()


const getDate = async(req,res)=>{
    res.status(200).json({date:"MY date"})
}

const getUser = async(req,res)=>{
    // res.status(200).json({message:"Hii i am here...."})
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed"
    })
}

const loginFailed = (req,res,next)=>{
    res.status(401).json({error:true,message:"Login Failure"})
}

const loginSuccess = (req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Login Successful",
            user:req.user
        })
    }else{
        res.status(403).json({error:true,message:"Not Authorized"})
    }
}

const getData = (req,res)=>{
    passport.authenticate("google",["profile","email"])
}

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
    try{
        user = User({
            email,password
        })
        user = await user.save()
    }catch(err){
        console.log(err)
    }

    if(!user){
        res.status(500).json({message:"Unexpected error"})
    }
    res.status(201).json({user})
}

// const oauthWithGoogle = ()

exports.getUser = getUser
exports.userSignup = userSignup
exports.loginSuccess = loginSuccess
exports.loginFailed = loginFailed
exports.getData = getData
exports.getDate = getDate