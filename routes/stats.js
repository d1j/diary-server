const router = require("express").Router();

const control = require("../controllers/stats");

router.get("/totalHoursOfSleep", control.totalHoursOfSleep);

module.exports = router;
