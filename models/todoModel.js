const mongoose = require('mongoose');
// create schema
const todoSchema = new mongoose.Schema({
    todo: String,
    user:{
        type: mongoose.ObjectId,
         ref: 'User',
         required: true
     },
     createdAt: {
        type: Date,
        default: Date.now,
      },
  });
// create model using schema
  const Todo = mongoose.model('Todo', todoSchema);

 module.exports = Todo;