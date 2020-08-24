require("dotenv").config();
const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const entry = require("./routes/entry");
const tag = require("./routes/tag");
const db = require("./src/db");

app.use(bodyParser.json());
if (process.env.NODE_ENV != "test") app.use(morgan("tiny"));

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/diary/entry", entry);
app.use("/diary/tags", tag);

app.listen(() => {
  if (process.env.NODE_ENV != "test")
    console.log(
      `Example app listening at http://localhost:${config.get("appPort")}`
    );
});

db.init(config.get("dbConfig"));

module.exports = app;
