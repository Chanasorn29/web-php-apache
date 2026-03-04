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
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Quote", quoteSchema);
