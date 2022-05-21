const express = require("express");
const app = express();
require("dotenv").config();
const connectionDB = require("./connect");
const router = require("./router/router");
app.use(express.json());
app.use(router);


const start = async () => {
  try {
    app.listen(
      5000,
      console.log("Server listening on port 5000")
    );
    await connectionDB(
      process.env.MONGO_URI,
      console.log("Connection established with the database")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
