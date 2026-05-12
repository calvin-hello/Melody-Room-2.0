import express from "express"
import Post from "../models/post.js";
import Artist from "../models/artist.js";
import Album from "../models/album.js";
import Song from "../models/song.js";

const router = express.Router();

// GET /api/search
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const search = name ? name.trim() : '';
    let results;

    if (search === '') {
        const [artists, albums, songs, posts] = await Promise.all([
                Artist.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .select('name image'),
                Album.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .select('title artist coverImage')
                    .populate('artist', 'name'),
                Song.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .select('title artist duration coverImage')
                    .populate('artist', 'name'),
                Post.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .select('author authorType image'),
            ]);

        results = {
            artists: artists,
            albums: albums,
            songs: songs,
            posts: posts,
        };
    } else {
        const regex = new RegExp(search, 'i');

        const [artists, albums, songs, posts] = await Promise.all([
                Artist.find({ name: regex })
                    .limit(10)
                    .select('name image'),
                Album.find({ title: regex })
                    .limit(10)
                    .select('title artist coverImage')
                    .populate('artist', 'name'),
                Song.find({ title: regex })
                    .limit(10)
                    .select('title artist duration coverImage')
                    .populate('artist', 'name'),
                Post.find({ content: regex })
                    .limit(10)
                    .select('author authorType image'),
            ]);

        results = {
            artists: artists,
            albums: albums,
            songs: songs,
            posts: posts,
        };
    }
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router