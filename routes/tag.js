const router = require("express").Router();
const control = require("../controllers/tag");

router
  .route("/")
  .get(control.getTags)
  .post(control.createTag)
  .put(control.updateTag)
  .delete(control.deleteTag);

module.exports = router;
