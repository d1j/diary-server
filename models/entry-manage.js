const Entry = require("./Entry");

function getDayInterval(date) {
  let start = new Date(date);
  let end = new Date(date);
  end.setDate(start.getDate() + 1);
  return { start, end };
}

module.exports.getEntry = async (date) => {
  try {
    let day = getDayInterval(date);
    let data = await Entry.find({ date: { $gte: day.start, $lt: day.end } })
      .select("-__v")
      .lean();
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.createEntry = async (entryData) => {
  try {
    let newEntry = new Entry(entryData);
    await newEntry.save();
    return newEntry._id;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteEntry = async (date) => {
  try {
    let day = getDayInterval(date);
    await Entry.deleteOne({ date: { $gte: day.start, $lt: day.end } });
  } catch (err) {
    throw err;
  }
};

module.exports.updateEntry = async (date, updateData) => {
  try {
    let day = getDayInterval(date);
    await Entry.findOneAndUpdate(
      { date: { $gte: day.start, $lt: day.end } },
      updateData
    );
  } catch (err) {
    throw err;
  }
};

module.exports.getPeriodData = async (startDate, endDate) => {
  try {
    let data = await Entry.find({ date: { $gte: startDate, $lte: endDate } })
      .select("-__v")
      .lean();
    return data;
  } catch (err) {
    throw err;
  }
};
