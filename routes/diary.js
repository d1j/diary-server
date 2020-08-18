const router = require("express").Router();
const bodyParser = require("body-parser");

const tools = require("../src/tools");
const db = require("../src/db");
const { Router } = require("express");

router.use(bodyParser.json());

//Tag handling API
router.post("/tags/add", async (req, res) => {
  try {
    tools.contentCheck(req.body.tagData, ["tagName", "color"]);
    await db.addTag(req.body);
    res.sendStatus(201);
    console.log("Tag added.");
  } catch (err) {
    console.log("!!! Failed to add new tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/tags/list", async (req, res) => {
  try {
    let data = await db.listTags();
    res.status(200).json(data);
    console.log("Tags listed.");
  } catch (err) {
    console.log("!!! Failed to get list of tags.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/tags/delete", async (req, res) => {
  try {
    tools.contentCheck(req.body, "_id");
    await db.deleteTag(req.body);
    res.sendStatus(200);
    console.log("Tag deleted.");
  } catch (err) {
    console.log("!!! Failed to delete tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/tags/update", async (req, res) => {
  try {
    tools.contentCheck(req.body, ["_id", "updateData"]);
    await db.updateTag(req.body);
    res.sendStatus(200);
    console.log("Tag updated.");
  } catch (err) {
    console.log("!!! Failed to update tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

//Entry handling API
router.post("/entry/add", async (req, res) => {
  try {
    tools.contentCheck(req.body.entryData, "date");
    await db.createEntry(req.body);
    res.sendStatus(201);
    console.log("Entry created.");
  } catch (err) {
    console.log("!!! Failed to create entry.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/entry/get", async (req, res) => {
  try {
    tools.contentCheck(req.body, "date");
    let data = await db.getEntry(req.body);
    res.status(200).json(data);
    console.log("Entry extracted.");
  } catch (err) {
    console.log("!!! Failed to get entry.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/entry/delete", async (req, res) => {
  try {
    tools.contentCheck(req.body, "date");
    await db.deleteEntry(req.body);
    res.sendStatus(204);
    console.log("Entry deleted.");
  } catch (err) {
    console.log("!!! Failed to delete entry.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/entry/update", async (req, res) => {
  try {
    tools.contentCheck(req.body, ["date", "updateData"]);
    await db.updateEntry(req.body);
    res.sendStatus(200);
    console.log("Entry updated");
  } catch (err) {
    console.log("!!! Failed to update the entry.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/entry/period", async (req, res) => {
  try {
    tools.contentCheck(req.body, ["startDate", "endDate"]);
    let data = await db.getPeriodData(req.body);
    res.status(200).json(data);
    console.log("Period extracted.");
  } catch (err) {
    console.log("!!! Failed to get period.");
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
