const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    // Find the user by email
    const user = await User.findOne({ email: data.email }).exec();

    // If user does not exist
    if (!user) {
      return res.status(401).send("Invalid Email or Password");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      // create a webtoken for login
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1hr" }
      );
      // Set the token in a secure and HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.send("Login success");
    } else {
      res.status(401).send("Invalid Email or Password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
// verify login with token
const verifyLogin = async (req, res) => {
  if (req.cookies.token) {
    try {
      // verify  the token
      const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      res.json({ verified: true });
    } catch (error) {
      res.status(401).send("Unauthoraized Access!");
    }
  } else {
    res.json({ verified: false });
  }
};

// Logout
const logoutUser = async (req, res) => {
    // Clear the token cookie upon logout
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.send("Logged Out");
  };

module.exports = {
  loginUser,
  verifyLogin,logoutUser
};
