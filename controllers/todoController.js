const Todo = require("../models/todoModel");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.todoId, user: req.user._id }).exec();
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addTodo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized access");
    }
    const todo = new Todo({
      ...req.body,
      user: req.user._id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(400).send("Bad Request");
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoId, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(400).send("Bad Request");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.todoId, user: req.user._id });
    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.send("Todo Deleted");
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
