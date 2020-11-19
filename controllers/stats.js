const tools = require("../util/tools");
const stats = require("../models/stats-manage");

module.exports.totalHoursOfSleep = async (req, res) => {
  try {
    tools.queryCheck(req.query, ["start", "end"]);
    let data = await stats.getTotalHoursOfSleep(req.query.start, req.query.end);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/*
module.exports. = (req, res) => {
   try {
      
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 
};
*/
