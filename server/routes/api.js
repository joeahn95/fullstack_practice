const express = require('express');

const taskController = require('../controllers/taskController.js');

const router = express.Router();

// post a new task
router.post('/task', taskController.postTask, (req, res) => res.status(200).json(res.locals.task));

// get all tasks
router.get('/task', taskController.getTasks, (req, res) => res.status(200).json(res.locals.tasks));

// get all tasks
router.delete('/task/:id', taskController.deleteTask, (req, res) => res.status(200).json(res.locals.task));

module.exports = router;