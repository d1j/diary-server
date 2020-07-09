const router = require("express").Router();
const bodyParser = require("body-parser");

const tools = require("../src/tools");
const db = require("../src/db");

router.use(bodyParser.json());

router.post("/add-tag", async (req, res) => {
  try {
    tools.contentCheck(req.body, [
      "tag_name",
      "color",
      "description",
      "tag_group",
    ]);
    await db.addTag(req.body);
    res.sendStatus(201);
    console.log("Tag added");
  } catch (err) {
    console.log("!!! Failed to add a new tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/list-tags", async (req, res) => {
  try {
    let data = await db.listTags();
    res.status(200).json(data);
    console.log("Tags listed");
  } catch (err) {
    console.log("!!! Failed to get a list of tags.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/delete-tag", async (req, res) => {
  try {
    tools.contentCheck(req.body, "_id");
    await db.deleteTag(req.body);
    res.sendStatus(200);
    console.log("Tag deleted");
  } catch (err) {
    console.log("!!! Failed to delete a tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/update-tag", async (req, res) => {
  try {
    tools.contentCheck(req.body, "_id");
    await db.updateTag(req.body);
    res.sendStatus(200);
    console.log("Tag updated");
  } catch (err) {
    console.log("!!! Failed to update a tag.");
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
