const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  mood: String,
  note: String,
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodLog', moodLogSchema);