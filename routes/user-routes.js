const express = require('express')
const { userSignup, loginUser, getUserById,getAllUsers,updateProfileDetails } = require('../controllers/user-controller')

const userRouter = express.Router()

userRouter.post('/auth',userSignup)
userRouter.post('/autho',loginUser)
userRouter.get('/user/:id',getUserById)
userRouter.get('/allusers',getAllUsers)
userRouter.put('/profile/update/:id',updateProfileDetails)

module.exports = userRouter