const express = require('express');
const router = express.Router();

// GET /api/music/trending - Mock trending music data
router.get('/trending', async (req, res) => {
  res.json([
    { id: 1, title: 'Midnight Bloom', artist: 'Cosmo Sheldrake', genre: 'Indie', plays: 12400 },
    { id: 2, title: 'Electric Soul', artist: 'Jon Bellion', genre: 'Pop', plays: 9800 },
    { id: 3, title: 'Forest Echoes', artist: 'Mother Mother', genre: 'Alternative', plays: 8700 },
  ]);
});

module.exports = router;