const express = require("express");
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
