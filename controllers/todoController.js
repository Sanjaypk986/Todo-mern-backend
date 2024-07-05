const Todo = require("../models/todoModel");

const getAllTodos = async(req, res) => {
  const todos = await Todo.find({});
    res.json(todos)
  }
  const getTodoById = async(req, res) => {
    const todo = await Todo.findById(req.params.todoId).exec();
    res.json(todo)
  }
  const addTodo = async(req, res) => {
    // create new todo 
    const todo = new Todo(req.body);
    // save data
    await todo.save(); 
    // response
    res.json(todo)
  }
  const updateTodo = async(req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {new:true})
    res.json(updatedTodo)
  }
  const deleteTodo = async(req, res) => {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.todoId)
    res.send('Todo Deleted')
  }

  module.exports = {
    getAllTodos,getTodoById,addTodo,updateTodo,deleteTodo
  }