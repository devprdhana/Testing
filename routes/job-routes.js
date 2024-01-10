const express = require('express')
const { postJob } = require('../controllers/job-controller')
const jobRouter = express.Router()

jobRouter.post('/p-job',postJob)

module.exports = jobRouter