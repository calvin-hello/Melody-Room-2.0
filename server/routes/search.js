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


router.get("/song/:id", async (req, res) => {
  const response = await fetch(`https://api.deezer.com/track/${req.params.id}`);
  const data = await response.json();

  res.json({
    id: data.id,
    title: data.title,
    artist: data.artist?.name,
    coverImage: data.album?.cover_big,
    preview: data.preview,
    duration: data.duration,
  });
});

router.get("/artist/:id", async (req, res) => {
  try {
    const response = await fetch(`https://api.deezer.com/artist/${req.params.id}`);
    const data = await response.json();

    res.json({
      id: data.id,
      name: data.name,
      image: data.picture_big,
      type: "artist",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// make the song of the week of other stuff look more real
let weeklyTracks = [];
let lastUpdated = 0;

router.get("/profile-music", async (req, res) => {
  try { 
    const now = Date.now();
    if (weeklyTracks.length === 0 || now - lastUpdated > 60000) {
      const response = await fetch(`https://api.deezer.com/chart/0/tracks`);
      const data = await response.json();

      const shuffled = data.data.sort(() => 0.5 - Math.random());
      weeklyTracks = shuffled.slice(0, 4).map((song) => ({
        id: song.id, 
        title: song.title,
        coverImage: song.album?.cover_medium,
        artist: {
           name: song.artist?.name,
        },

        album: {
           title: song.album?.title,
        },
        
      }));
      lastUpdated = now;
    }

    const randomSong = weeklyTracks[Math.floor(Math.random() * weeklyTracks.length)];
    const randomAlbumTrack = weeklyTracks[Math.floor(Math.random() * weeklyTracks.length)];

    res.json({
      weeklyTracks,

      favSong: {
        id: randomSong.id,
        title: randomSong.title,
        artist: randomSong.artist.name,
        coverImage: randomSong.coverImage,
      },
      favAlbum: {
        id: randomAlbumTrack.id,
        title: randomAlbumTrack.album.title,
        artist: randomAlbumTrack.artist.name,
        coverImage: randomAlbumTrack.coverImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;