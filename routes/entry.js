const router = require("express").Router();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const tools = require("../src/tools");
const db = require("../src/db");

router.use(bodyParser.json());
router.use(morgan("tiny"));

router.post("/add", async (req, res) => {
  try {
    tools.bodyCheck(req.body, "date");
    let data = await db.createEntry(req.body);
    res.status(201).json({ _id: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/get", async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    let data = await db.getEntry(req.query.date);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/period", async (req, res) => {
  try {
    tools.queryCheck(req.query, ["start", "end"]);
    console.log(req.query);
    let data = await db.getPeriodData(req.query.start, req.query.end);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    await db.deleteEntry(req.query.date);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update", async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    await db.updateEntry(req.query.date, req.body);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
