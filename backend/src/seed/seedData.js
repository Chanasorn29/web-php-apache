const mongoose = require('mongoose');
const Meme = require('../models/Meme');
require('dotenv').config({ path: '../../.env' });

const memes = [
  { title: 'When Monday hits', imageUrl: 'https://i.imgur.com/Ry0WPeE.jpeg', category: 'sad' },
  { title: 'Friday mood!', imageUrl: 'https://i.imgur.com/3ZHmFKV.jpeg', category: 'happy' },
  { title: 'Me on deadlines', imageUrl: 'https://i.imgur.com/K6fxmSC.jpeg', category: 'angry' },
  { title: 'Unexpected plot twist', imageUrl: 'https://i.imgur.com/C3FIxvY.jpeg', category: 'surprised' },
  { title: 'Cat does nothing', imageUrl: 'https://i.imgur.com/lZ4GBAB.jpeg', category: 'funny' },
  { title: 'You got this!', imageUrl: 'https://i.imgur.com/6xZ4DcG.jpeg', category: 'motivation' },
  { title: 'Monday again?', imageUrl: 'https://i.imgur.com/abc7.jpg', category: 'sad' },
  { title: 'Weekend is here', imageUrl: 'https://i.imgur.com/abc8.jpg', category: 'happy' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Meme.deleteMany({});
    await Meme.insertMany(memes);
    console.log('Seed complete! Added', memes.length, 'memes');
    process.exit();
  })
  .catch(err => {
    console.log('Seed failed:', err);
    process.exit(1);
  });