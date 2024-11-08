import express from 'express';
import { getNearbyBars } from '../../controllers/places-controller.js'

const router = express.Router();

// This is the nearby bars endpoint
router.post('/nearby-bars', getNearbyBars);

export {router as placesRoutes};
