const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const bearerHeader = req.headers["Authorization"];
  const token = bearerHeader.split(' ')[1]
  if (!token) {
    res.json({ message: "A JSON web token is required for authorization" });
  }
  console.log(token);
  try {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)
    res.json('Token verified')
  } catch (error) {
    res.json({error})
  }

  next();
};

module.exports = auth;
