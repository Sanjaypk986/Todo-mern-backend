const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addUser = async (req, res) => {
    try {
      const data = req.body;
      const password = data.password;
      const email = await User.findOne({ email: data.email }).exec();
      if (!email) {
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({ ...data, password: hash });
        await user.save();
        res.status(201).json(user);
      } else {
        res.status(409).send("Email already exists");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(400).send("Bad Request");
    }
  };
  

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Bad Request");
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send("User Deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
