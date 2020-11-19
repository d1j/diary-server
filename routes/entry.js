const router = require("express").Router();

const control = require("../controllers/entry");

router.get("/period", control.getPeriodData);

router
  .route("/")
  .get(control.getEntry)
  .post(control.createEntry)
  .put(control.updateEntry)
  .delete(control.deleteEntry);

module.exports = router;
