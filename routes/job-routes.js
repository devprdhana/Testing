const express = require('express')
const { postJob, getJobById, getJobBySkill } = require('../controllers/job-controller')
const jobRouter = express.Router()

jobRouter.post('/p-job',postJob)
jobRouter.get('/:id',getJobById)
jobRouter.post('/',getJobBySkill)

module.exports = jobRouter