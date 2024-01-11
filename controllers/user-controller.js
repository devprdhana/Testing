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
        user = await User.findById(id)
    }catch(err){
        console.log(err)
    }

    if(!user){
        res.status(500).json({message:"Internal sever error"})
    }
    res.status(200).json(user)
}
const getAllUsers = async (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`User IP Address: ${ip}`);
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({users,ip});
}

const getUserBySkills = async(req,res,next)=>{
    const {skills} = req.body
    let users;
    try{
        users = await User.find()
    }catch(err){
        console.log(err)
    }
     if(!users){
        res.status(404).json({message:"No users found"})
     }

     const filterUserBySkills = (users,skills)=>{
        return users.filter(user=>{
            const userSkills = user.tools || []
            return skills.some(skill=>userSkills.includes(skill))
        })
     }

     const filteredUsers = filterUserBySkills(users,skills)
     console.log(filteredUsers)
     res.status(200).json(filteredUsers)
}
const updateProfileDetails=async(req,res)=>{
    const id=req.params.id 
    const {  userName, firstName, lastName, profilePicture, tools } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the profile details excluding email
        if (userName !== undefined) user.userName = userName;
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (profilePicture !== undefined) user.profilePicture = profilePicture;
        if (tools !== undefined) user.tools = tools;

        // Save the updated user
        const updatedUser = await user.save();

        console.log('Profile details updated successfully:', updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile details:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

    
exports.userSignup = userSignup
exports.loginUser = loginUser
exports.getUserById = getUserById
exports.getAllUsers=getAllUsers
exports.getUserBySkills = getUserBySkills
exports.updateProfileDetails=updateProfileDetails
