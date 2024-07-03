const express = require("express");
const {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();

router.get("/", getAllTodos);
router.get("/:todoId", getTodoById);
router.post("/", addTodo);
router.patch("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

module.exports = router;
