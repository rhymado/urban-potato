// <es6 require
const express = require("express");
// >es6 import
// import exp from "express";

// create express application
const app = express();
const PORT = 8080;

// URL = PROTOCOL://HOST:PORT/ENDPOINT
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
app.get("/", (req, res) => {
  //   res.json({
  //     msg: "Selamat Datang di Toko Kopi API",
  //   });
  //   const path = require("path");
  //   res.status(201).sendFile(path.join(__dirname, "/src/html/welcome.html"));
  const db = require("./src/configs/postgre");
  db.query(
    "select id, email, display_name, birth_date from users",
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          msg: "Internal Server Error",
        });
        return;
      }
      res.status(200).json({
        data: result.rows,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  //   console.log("Welcome");
});
