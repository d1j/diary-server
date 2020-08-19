require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const db = require("./src/db");

const entry = require("./routes/entry");
const tag = require("./routes/tag");

app.use("/diary/entry", entry);
app.use("/diary/tag", tag);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${process.env.NODE_PORT}`
  )
);

db.init();

module.exports = app;
