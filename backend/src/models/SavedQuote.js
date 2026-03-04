const mongoose = require('mongoose');

const savedQuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  category: String,
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedQuote', savedQuoteSchema);