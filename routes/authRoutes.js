const express = require("express");
const { loginUser, verifyLogin, logoutUser } = require("../controllers/authController");
const router = express.Router();

router.post("/login",loginUser );
router.get("/verify",verifyLogin );
router.get("/logout",logoutUser );

module.exports = router;
