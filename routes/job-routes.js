const express = require('express')
const { postJob, getJobById, getJobBySkill, updateJob, getAllJobs, applyToJob, getAppliedUsersByjobID } = require('../controllers/job-controller')
const jobRouter = express.Router()

jobRouter.post('/p-job',postJob)
jobRouter.get('/:id',getJobById)

jobRouter.post('/',getJobBySkill)
jobRouter.post('/:jobId',updateJob)
jobRouter.get('/alljobs',getAllJobs)
jobRouter.post('/apply/:jobId',applyToJob)
jobRouter.get('/applied/:jobId',getAppliedUsersByjobID)

module.exports = jobRouter