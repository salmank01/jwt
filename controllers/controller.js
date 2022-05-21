const express = require("express");
const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

// Sign Up logic starts here
const signup = async (req, res) => {
  // Get user input
  const { first_name, last_name, email, password } = req.body;
  // Check if all info is passed to us
  if (!(email && password && first_name && last_name)) {
    res.json({ message: "All input fields are required" });
  }

  // Validate if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.json({ message: "User already exists. Please head to the login page" });
  }

  // Password Encryption
  encryptedPassword = await bcrypt.hash(password, 10);
  // Create user
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: encryptedPassword,
  });
  res.json({ newUser });
};

// Login logic starts here
const login = async (req, res) => {
  // Get user input
  const { email, password } = req.body;
  // Validate the info
  if (!email && password) {
    res.json({ message: "All input fields are required" });
  }
  // Validate if user already exists
  const existingUser = await User.findOne({ email });
  // Verify User
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    // Create Token
    const token = jwt.sign(email , process.env.SECRET_ACCESS_TOKEN);
    existingUser.token = token;
    res.json({ token });
  } else {
    res.status(403).json({ message: "An errror occured" });
  }
};

const auth = (req, res, next) => {
  const bearerHeader = req.headers["Authorization"];
  const token = bearerHeader.split(' ')[1]
  if (!token) {
    res.json({ message: "A JSON web token is required for authorization" });
  }
  console.log(token);
  try {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)
    res.send('Token verified')
  } catch (error) {
    res.json({error})
  }

  next();
};
// Tasks logic starts here
const getTask = async (req, auth, res) => {
  
}

module.exports = {
  signup,
  login,
  getTask,
};
