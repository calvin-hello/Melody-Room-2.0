import express from "express"

const router = express.Router();

// GET /api/music/trending - Mock trending music data
router.get('/', async (req, res) => {
  const songRes = await fetch(`https://api.deezer.com/search?q=ALL&order=RANKING&limit=20`);

  const songData = await songRes.json();

  res.json({
    songs: (songData.data || []).slice(0, 20).map((song) => ({
        _id: song.id,
        title: song.title,
        duration: song.duration,
        preview: song.preview,
        coverImage: song.album?.cover_medium,
        artist: {
          name: song.artist?.name,
        },
      })),
  });
});

export default router