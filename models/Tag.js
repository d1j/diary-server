const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tag = new Schema({
  tagName: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String },
  tagGroup: { type: String },
});

module.exports = mongoose.model("Tag", Tag);
