const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');
const SpinLog = require('../models/SpinLog');


router.get('/random', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const count = await Meme.countDocuments(filter);
    if (count === 0) return res.status(404).json({ error: 'No memes found' });

    const random = Math.floor(Math.random() * count);
    const meme = await Meme.findOne(filter).skip(random);

   
    await SpinLog.create({ category: category || 'all', memeId: meme._id });

    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories', (req, res) => {
  res.json(['happy', 'sad', 'angry', 'surprised', 'funny', 'motivation']);
});

module.exports = router;