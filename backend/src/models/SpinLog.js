const mongoose = require('mongoose');

const spinLogSchema = new mongoose.Schema({
  category: String,
  quoteId: mongoose.Schema.Types.ObjectId,
  spunAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpinLog', spinLogSchema);