import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { userRouter } from "./api/user-routes.js";
import { placesRoutes } from './api/places-routes.js';

const router = Router();

router.use("/places", placesRoutes);
router.use('/users', userRouter);
router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);



export default router;
