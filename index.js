require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main().then(() => console.log("Connected to MongoDB")).catch(err => console.error("MongoDB connection error:", err));

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}
