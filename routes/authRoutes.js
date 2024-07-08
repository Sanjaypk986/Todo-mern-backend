const express = require("express");
const { loginUser, verifyLogin, logoutUser, resetPassword, resetPasswordRequest } = require("../controllers/authController");
const router = express.Router();

router.post("/login",loginUser );
router.get("/verify",verifyLogin );
router.get("/logout",logoutUser );
router.post("/reset-password", resetPassword)
router.post("/request-reset", resetPasswordRequest)

module.exports = router;
