const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");


// Transporter configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.APP_PASSWORD,
  },
  });


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
      // Create a JWT token for login
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
      res.json({ message: "Login success" });
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


// request to reset
const resetPasswordRequest = async (req, res) => {
  // get email in req.body
  const { email } = req.body;
  try {
    // find user with email
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).send("user not found");
    }
    // create a token using user.id
    const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_KEY, {
      expiresIn: "15m",
    });
    // nodemailer configure
    const resetUrl = `${process.env.API_BASE_URL}/reset-password?token=${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      html: `Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 15 minutes.`,
    };
    // send mail to user
    await transporter.sendMail(mailOptions);
    res.send("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Reset password
const resetPassword = async (req, res) => {
  // destructure token and newpassword
  const {token , newPassword} = req.body
  try{
  // verify jwt token 
  const decoded = jwt.verify(token,process.env.JWT_RESET_KEY)
  // find user with user.id from jwt verify
  const user = await User.findById(decoded.userId);
  // check user available
  if (!user) {
    return res.status(404).send("User not found")
  }
  // change user password using new password
  user.password = await bcrypt.hash(newPassword,10)
  // save user
  await user.save()
  res.send("Password reset successful");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal Server Error");
  }

};
module.exports = {
  loginUser,
  verifyLogin,
  logoutUser,
  resetPassword,
  resetPasswordRequest,
};
