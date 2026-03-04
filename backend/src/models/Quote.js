const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    text: String,
    author: String,
    category: {
      type: String,
      enum: [
        "calm",
        "happy",
        "romantic",
        "motivation",
        "reflective",
        "sad",
        "grateful",
      ],
    },
  },
  {
    versionKey: false,
    timeseries: false,
  },
);

module.exports = mongoose.model("Quote", quoteSchema);
