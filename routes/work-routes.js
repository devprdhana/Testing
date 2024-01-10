const express = require('express');
const workRouter = express.Router();
const {   getAllWorks, getWorkById, createWork, editWork } = require('../controllers/work-controller')

// Define routes
workRouter.get('/',getAllWorks);
workRouter.get('/:workId',getWorkById);
workRouter.post('/', createWork);
workRouter.post('/:workId',editWork); // Added edit route

module.exports = workRouter;

