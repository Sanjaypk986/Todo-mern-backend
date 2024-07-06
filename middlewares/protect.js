const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const userInfo = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      req.user = userInfo;
      next();
    } else {
      res.status(401).send("Unauthorized access!");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Unauthorized access!");
  }
};

module.exports = protect;
