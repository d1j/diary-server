const tools = require("../util/tools");
const tag = require("../models/tag-manage");

module.exports.getTags = async (req, res) => {
  try {
    const data = await tag.getTags();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.createTag = async (req, res) => {
  try {
    tools.bodyCheck(req.body, ["tagName", "color"]);
    const data = await tag.createTag(req.body);
    res.status(201).json({ _id: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.updateTag = async (req, res) => {
  try {
    tools.queryCheck(req.query, "_id");
    await tag.updateTag(req.query._id, req.body);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.deleteTag = async (req, res) => {
  try {
    tools.queryCheck(req.query, "_id");
    await tag.deleteTag(req.query._id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
