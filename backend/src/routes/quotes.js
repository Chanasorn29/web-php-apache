const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const SpinLog = require('../models/SpinLog');

// GET random quote
router.get('/random', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const count = await Quote.countDocuments(filter);
    if (count === 0) return res.status(404).json({ error: 'No quotes found' });

    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne(filter).skip(random);

    await SpinLog.create({ category: category || 'all', quoteId: quote._id });

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all categories
router.get('/categories', (req, res) => {
  res.json(['calm', 'happy', 'romantic', 'motivation', 'reflective', 'sad', 'grateful']);
});

// POST save quote
router.post('/save', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    const SavedQuote = require('../models/SavedQuote');
    const saved = await SavedQuote.create({ text, author, category });
    res.json({ success: true, saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET saved quotes
router.get('/saved', async (req, res) => {
  try {
    const SavedQuote = require('../models/SavedQuote');
    const saved = await SavedQuote.find().sort({ savedAt: -1 });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;