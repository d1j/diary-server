const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tag = new Schema({
  tagName: { type: String },
  color: { type: String },
  description: { type: String },
  tagGroup: { type: String },
});

const Entry = new Schema({
  date: { type: Date },
  tags: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Tag" },
      hours_spent: { type: Number },
      times: { type: Number },
    },
  ],
  notes: { type: String },
  wokeUp: { type: Date },
  wentToSleep: { type: Date },
  energy: { type: Number, min: 1, max: 10 },
  happiness: { type: Number, min: 1, max: 10 },
  motivation: { type: Number, min: 1, max: 10 },
});

module.exports.Entry = mongoose.model("Entry", Entry);
module.exports.Tag = mongoose.model("Tag", Tag);
