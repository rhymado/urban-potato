require("dotenv").config();
// const dotenv = require('dotenv')
// import dotenv from 'dotenv';
// dotenv.config()
// <es6 require
const express = require("express");
const cors = require("cors");
// >es6 import
// import exp from "express";

// create express application
const app = express();

const { serverPort } = require("./src/configs/environment");
const PORT = serverPort || 8080;

app.use(cors());
// parser untuk body
app.use(express.urlencoded({ extended: false })); // form-urlencoded
app.use(express.json()); // raw json
// body akan dimasukkan ke req.body

const morgan = require("morgan");
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);

// const { client } = require("./src/configs/mongo");

// client
//   .connect()
//   .then(() => {
//     console.log("Mongo DB Connected");
//     app.listen(PORT, () => {
//       console.log(`Server is running at port ${PORT}`);
//       //   console.log("Welcome");
//     });
//   })
//   .catch((err) => console.log(err));

const mongoose = require("mongoose");
const { mongoPass, mongoDbName, mongoDbHost, mongoDbUser } = require("./src/configs/environment");

mongoose
  .connect(
    `mongodb+srv://${mongoDbUser}:${mongoPass}@${mongoDbHost}/${mongoDbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo DB Connected");
    app.listen(PORT, () => {
      console.log(`Server us running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
