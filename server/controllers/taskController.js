const Task = require('../models/taskModel.js');

const taskController = {
  postTask: async (req, res, next) => {
    const {name} = req.body;

    try {
        const response = await Task.create({name: name});
        res.locals.task = response;

        return next();

    } catch(err) {
        return next({
            log: 'problem in postTask',
            message: {err: 'cannot add task'}
        })
    }
  },
  getTasks: async (req, res, next) => {

    try {
        const response = await Task.find();
        res.locals.tasks = response;

        return next();
        
    } catch(err) {
        return next({
            log: 'problem in getTasks',
            message: {err: 'cannot get tasks'}
        })
    }
  },
  deleteTask: async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await Task.findByIdAndDelete(id);
        res.locals.task = response;

        return next();
        
    } catch(err) {
        return next({
            log: 'problem in deleteTask',
            message: {err: 'cannot delete task'}
        })
    }
  },
}

module.exports = taskController;