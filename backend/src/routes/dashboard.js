const express = require('express');
const router = express.Router();
const SpinLog = require('../models/SpinLog');


router.get('/', async (req, res) => {
  try {
    const totalSpins = await SpinLog.countDocuments();

    const byCategory = await SpinLog.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ totalSpins, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;