const mongoose = require("mongoose");

const spinLogSchema = new mongoose.Schema({
  category: String,
  quoteId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("SpinLog", spinLogSchema);
