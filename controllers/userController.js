const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async(req, res) => {
  const users = await User.find({});
    res.json(users)
  }
  const getUserById = async(req, res) => {
    const user = await User.findById(req.params.userId).exec();
    res.json(user)
  }
  const addUser = async(req, res) => {
    // get data
    const data = req.body
    // store password separate variable
    const password = data.password
    // encrypt password
    const hash = bcrypt.hashSync(password, saltRounds);
    // create new user 
    const user = new User({
        ...data, password:hash
    });
    // save data
    await user.save(); 
    // response
    res.json(user)
  }
  const updateUser = async(req, res) => {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
        res.json(updatedUser)
  }
  const deleteUser = async(req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.userId)
    res.send('User Deleted')
  }

  module.exports = {
    getAllUsers,getUserById,addUser,updateUser,deleteUser
  }