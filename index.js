require("dotenv").config();
const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const entry = require("./routes/entry");
const tag = require("./routes/tag");
const stats = require("./routes/stats");

app.use(bodyParser.json());
if (process.env.NODE_ENV != "test") app.use(morgan("tiny"));

app.use("/entry", entry);
app.use("/tag", tag);
app.use("/stats", stats);

app.use("/", (req, res) => res.status(404).send("404, path does not exist"));

//initialize node app.
app.listen(config.get("appPort"), () => {
  if (process.env.NODE_ENV != "test")
    console.log(
      `Example app listening at http://localhost:${config.get("appPort")}`
    );
});

//dadatabase connection initialization
const { host, port, name } = config.get("dbConfig");
if (process.env.NODE_ENV != "test") console.log("Connecting to MongoDB...");
const dbUrl = `mongodb://${host}:${port}/${name}`;
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(dbUrl, dbConfig).then(
  () => {
    if (process.env.NODE_ENV != "test")
      console.log("Successfully connected to MongoDB.");
  },
  (err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  }
);

module.exports = app;
