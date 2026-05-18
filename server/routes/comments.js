// Routes for the comments feature
//   GET  /api/comments?postId=XYZ  -> list comments for one post
//   POST /api/comments             -> create a new comment
import express from "express";
import Comment from "../models/comment.js";

const router = express.Router();

// GET /api/comments?postId=XYZ
// Returns all comments for the given post, oldest first.
router.get("/", async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/comments
// Body: { postId, author, text }
router.post("/", async (req, res) => {
  try {
    const { postId, author, text } = req.body;

    if (!postId || !author || !text || !text.trim()) {
      return res
        .status(400)
        .json({ message: "postId, author and text are required" });
    }

    const comment = await Comment.create({
      postId: String(postId),
      author,
      text: text.trim(),
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
