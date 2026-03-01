const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');

router.get('/', async (req, res) => {
  try {
    const total = await MoodLog.countDocuments();

    const byMood = await MoodLog.aggregate([
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // คำนวณ % ของแต่ละ mood
    const moodStats = byMood.map(m => ({
      mood: m._id,
      count: m.count,
      percentage: total > 0 ? Math.round((m.count / total) * 100) : 0
    }));

    res.json({ total, moodStats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
