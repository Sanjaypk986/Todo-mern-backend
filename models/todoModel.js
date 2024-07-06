const mongoose = require('mongoose');
// create schema
const todoSchema = new mongoose.Schema({
    todo: String,
    user:{
        type: mongoose.ObjectId,
         ref: 'User',
         required: true
     },
  });
// create model using schema
  const Todo = mongoose.model('Todo', todoSchema);

 module.exports = Todo;