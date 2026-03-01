const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  category: {
    type: String,
    enum: ['calm', 'happy', 'romantic', 'motivation', 'reflective', 'sad', 'grateful'],
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);