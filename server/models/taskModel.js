const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for the 'tasks' collection
const taskSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

// creats a model for the 'tasks' collection that will be part of the export
module.exports = mongoose.model('tasks', taskSchema);
