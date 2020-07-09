require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const db = require("./src/db");

const Diary = require("./routes/diary");

app.use("/diary", Diary);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${process.env.NODE_PORT}`
  )
);

db.init();
