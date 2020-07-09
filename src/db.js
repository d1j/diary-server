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

module.exports.addTag = async ({ tag_name, color, description, tag_group }) => {
  try {
    let newTag = new Tag({ tag_name, color, description, tag_group });
    await newTag.save();
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

module.exports.deleteTag = async ({ _id }) => {
  try {
    await Tag.findByIdAndDelete(_id);
  } catch (err) {
    throw err;
  }
};

module.exports.updateTag = async ({
  _id,
  tag_name,
  color,
  description,
  tag_group,
}) => {
  try {
    let tag = await Tag.findByIdAndUpdate(_id, {
      tag_name,
      color,
      description,
      tag_group,
    });
  } catch (err) {
    throw err;
  }
};
