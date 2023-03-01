// <es6 require
const express = require("express");
// >es6 import
// import exp from "express";

// create express application
const app = express();
const PORT = 8080;

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  //   console.log("Welcome");
});
