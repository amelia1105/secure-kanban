import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use authRoutes for authentication-related endpoints
router.use('/auth', authRoutes);

// Use apiRoutes for API endpoints, with token authentication middleware
router.use('/api', authenticateToken, apiRoutes);

export default router;
