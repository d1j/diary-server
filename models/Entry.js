const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Entry = new Schema({
  date: { type: Date, required: true },
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

module.exports = mongoose.model("Entry", Entry);
