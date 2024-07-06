const express = require("express");
const {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const protect = require("../middlewares/protect");
const router = express.Router();

router.get("/",protect, getAllTodos);
router.get("/:todoId",protect, getTodoById);
router.post("/",protect, addTodo);
router.patch("/:todoId",protect, updateTodo);
router.delete("/:todoId",protect, deleteTodo);

module.exports = router;
