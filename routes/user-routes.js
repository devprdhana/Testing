const express = require('express')
<<<<<<< HEAD
const { userSignup, loginUser, getUserById, getAllUsers, getUserBySkills } = require('../controllers/user-controller')
=======
const { userSignup, loginUser, getUserById,getAllUsers,updateProfileDetails } = require('../controllers/user-controller')
>>>>>>> 6f29174f046d4bd18fdbaed34fb6b6759d8c26f0

const userRouter = express.Router()

userRouter.post('/auth',userSignup)
userRouter.post('/autho',loginUser)
userRouter.get('/user/:id',getUserById)
userRouter.get('/allusers',getAllUsers)
<<<<<<< HEAD
userRouter.post('/users',getUserBySkills)
=======
userRouter.put('/profile/update/:id',updateProfileDetails)
>>>>>>> 6f29174f046d4bd18fdbaed34fb6b6759d8c26f0

module.exports = userRouter