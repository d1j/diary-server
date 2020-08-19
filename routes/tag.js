const router = require("express").Router();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const tools = require("../src/tools");
const db = require("../src/db");

router.use(bodyParser.json());
router.use(morgan("tiny"));

router.post("/add", async (req, res) => {
  try {
    tools.bodyCheck(req.body, ["tagName", "color"]);
    let data = await db.addTag(req.body);
    res.status(201).json({ _id: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/list", async (req, res) => {
  try {
    let data = await db.listTags();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    tools.queryCheck(req.query, "_id");
    await db.deleteTag(req.query._id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update", async (req, res) => {
  try {
    tools.queryCheck(req.query, "_id");
    await db.updateTag(req.params._id, req.body);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
