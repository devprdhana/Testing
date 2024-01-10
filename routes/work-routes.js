const express = require('express');
const workRouter = express.Router();
const {   getAllWorks, getWorkById, createWork, editWork, deleteWork } = require('../controllers/work-controller')

// Define routes
workRouter.get('/',getAllWorks);
workRouter.get('/:workId',getWorkById);
workRouter.post('/', createWork);
workRouter.post('/:workId',editWork); // Added edit route
workRouter.delete('/:workId',deleteWork);
module.exports = workRouter;

