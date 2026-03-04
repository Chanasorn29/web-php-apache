const mongoose = require("mongoose");

const savedQuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  category: String,
});

module.exports = mongoose.model("SavedQuote", savedQuoteSchema);
