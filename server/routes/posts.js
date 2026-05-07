const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// GET /api/posts - Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts - Create post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.userId });
    await post.populate('author', 'username avatar');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/:id/like - Toggle like
router.put('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const liked = post.likes.includes(req.userId);
    if (liked) post.likes.pull(req.userId);
    else post.likes.push(req.userId);
    await post.save();
    res.json({ likes: post.likes.length, liked: !liked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts/:id/comment
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.userId, text: req.body.text });
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;