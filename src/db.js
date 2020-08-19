require("dotenv").config();
const mongoose = require("mongoose");

const Tag = require("../schemas/schemas").Tag;
const Entry = require("../schemas/schemas").Entry;

const DB_URL = `mongodb://${process.env.MONGO_HOSSTNAME}:27017/${process.env.DATABASE_NAME}`;
const DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports.init = () => {
  console.log("Connecting to MongoDB...");
  mongoose.connect(DB_URL, DB_CONFIG).then(
    () => {
      console.log("Successfully connected to MongoDB.");
    },
    (err) => {
      console.log("Failed to connect to MongoDB");
      console.log(err);
    }
  );
};

module.exports.addTag = async (tagData) => {
  try {
    let newTag = new Tag(tagData);
    await newTag.save();
    return newTag._id;
  } catch (err) {
    throw err;
  }
};

module.exports.listTags = async () => {
  try {
    return await Tag.find({}).select("-__v").lean();
  } catch (err) {
    throw err;
  }
};

module.exports.deleteTag = async (_id) => {
  try {
    await Tag.findByIdAndDelete(_id);
  } catch (err) {
    throw err;
  }
};

module.exports.updateTag = async (_id, updateData) => {
  try {
    await Tag.findByIdAndUpdate(_id, updateData);
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

function getDayInterval(date) {
  let start = new Date(date);
  let end = new Date(date);
  end.setDate(start.getDate() + 1);
  return { start, end };
}

module.exports.getEntry = async (date) => {
  try {
    let currDay = new Date(date);
    let nextDay = new Date(date);
    nextDay.setDate(currDay.getDate() + 1);
    let data = await Entry.find({ date: { $gte: currDay, $lt: nextDay } })
      .select("-__v")
      .lean();
    return data;
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

module.exports.deleteEntry = async (date) => {
  try {
    let currDay = new Date(date);
    let nextDay = new Date(date);
    nextDay.setDate(currDay.getDate() + 1);
    await Entry.deleteOne({ date: { $gte: currDay, $lt: nextDay } });
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
