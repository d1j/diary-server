const router = require("express").Router();

const tools = require("../src/tools");
const db = require("../src/db");

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

router
  .route("/")
  .post(async (req, res) => {
    try {
      tools.bodyCheck(req.body, "date");
      let data = await db.createEntry(req.body);
      res.status(201).json({ _id: data });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    try {
      tools.queryCheck(req.query, "date");
      let data = await db.getEntry(req.query.date);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      tools.queryCheck(req.query, "date");
      await db.deleteEntry(req.query.date);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
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
