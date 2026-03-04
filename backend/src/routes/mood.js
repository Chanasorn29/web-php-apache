const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');

// POST save mood
router.post('/save', async (req, res) => {
  try {
    const { mood, note } = req.body;
    const log = await MoodLog.create({ mood, note });
    res.json({ success: true, log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET mood history
router.get('/history', async (req, res) => {
  try {
    const logs = await MoodLog.find().sort({ savedAt: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;