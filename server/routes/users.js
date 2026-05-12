import express from "express";
import User from "../models/user.js";
//import authMiddleware from "../middleware/auth.js";
const router = express.Router();

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/follow/:id
router.put('/follow/:id', async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const me = await User.findById(req.body.currentUserId);
    const alreadyFollowing = me.following.some((userId) =>userId.toString() === target.id);

if (alreadyFollowing) {
      me.following.pull(target._id);
      target.followers.pull(me._id);
    } else {
      me.following.push(target._id);
      target.followers.push(me._id);
    }
    await me.save(); await target.save();
    res.json({ followers: target.followers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;