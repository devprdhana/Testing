const express = require('express')
const { getUser, userSignup, loginFailed, loginSuccess, getDate } = require('../controllers/user-controller')

const userRouter = express.Router()

userRouter.get('/auth/google/callback',getUser)
userRouter.get('/login/failed',loginFailed)
userRouter.get('/login/success',loginSuccess)
userRouter.post('/auth',userSignup)
userRouter.get("/date",getDate)
// userRouter.get

module.exports = userRouter