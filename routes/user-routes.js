const express = require('express')
const { userSignup, loginUser, getUserById } = require('../controllers/user-controller')

const userRouter = express.Router()

userRouter.post('/auth',userSignup)
userRouter.post('/autho',loginUser)
userRouter.get('/:id',getUserById)

module.exports = userRouter