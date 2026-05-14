import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const q = req.query.q?.trim() || "";

    if (!q) {
      return res.json({
        artists: [],
        albums: [],
        songs: [],
        posts: [],
      });
    }

    const regex = new RegExp(q, "i");

    const [artistRes, albumRes, songRes, posts] = await Promise.all([
      fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(q)}`),
      fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(q)}`),
      fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`),
      Post.find({ content: regex })
        .limit(10)
        .select("author authorType image content"),
    ]);

    const artistData = await artistRes.json();
    const albumData = await albumRes.json();
    const songData = await songRes.json();

    res.json({
      artists: (artistData.data || []).slice(0, 5).map((artist) => ({
        _id: artist.id,
        name: artist.name,
        image: artist.picture_medium,
      })),

      albums: (albumData.data || []).slice(0, 5).map((album) => ({
        _id: album.id,
        title: album.title,
        coverImage: album.cover_medium,
        artist: {
          name: album.artist?.name,
        },
      })),

      songs: (songData.data || []).slice(0, 5).map((song) => ({
        _id: song.id,
        title: song.title,
        duration: song.duration,
        preview: song.preview,
        coverImage: song.album?.cover_medium,
        artist: {
          name: song.artist?.name,
        },
      })),

      posts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;