const tools = require("../util/tools");
const entry = require("../models/entry-manage");

module.exports.getEntry = async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    let data = await entry.getEntry(req.query.date);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.createEntry = async (req, res) => {
  try {
    tools.bodyCheck(req.body, "date");
    let data = await entry.createEntry(req.body);
    res.status(201).json({ _id: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.deleteEntry = async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    await entry.deleteEntry(req.query.date);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.updateEntry = async (req, res) => {
  try {
    tools.queryCheck(req.query, "date");
    await entry.updateEntry(req.query.date, req.body);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.getPeriodData = async (req, res) => {
  try {
    tools.queryCheck(req.query, ["start", "end"]);
    let data = await entry.getPeriodData(req.query.start, req.query.end);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
