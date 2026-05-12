import express from 'express';

import authRoutes from './authRoutes.js';
import postRoutes from './posts.js';
import userRoutes from './users.js';
import musicRoutes from './Music.js';
import searchRoutes from './search.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/users', userRoutes);
router.use('/api/music', musicRoutes);
router.use('/api/search', searchRoutes);

export default router;