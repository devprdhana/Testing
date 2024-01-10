const express = require('express')
const { clientSignUp } = require('../controllers/client-controller')

const clientRouter = express.Router()

clientRouter.post('/auth',clientSignUp)

module.exports = clientRouter