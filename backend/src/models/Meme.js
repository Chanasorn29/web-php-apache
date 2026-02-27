const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: {
    type: String,
    enum: ['happy', 'sad', 'angry', 'surprised', 'funny', 'motivation'],
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meme', memeSchema);