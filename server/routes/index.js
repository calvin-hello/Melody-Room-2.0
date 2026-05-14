import express from 'express';

import authRoutes from './authRoutes.js';
import postRoutes from './posts.js';
import userRoutes from './users.js';
import musicRoutes from './Music.js';
import searchRoutes from './search.js';
import healthRoutes from './health.js';

const router = express.Router();

router.use('/api/auth', authRoutes); // /api/auth/register and /api/auth/login will be handled by authRoutes
router.use('/api/posts', postRoutes);
router.use('/api', healthRoutes);
router.use('/api/users', userRoutes);
router.use('/api/music', musicRoutes);
router.use('/api/search', searchRoutes);

export default router;