import { Router } from 'express';
import { searchPlacesHandler } from '../../controllers/places-controller.js';

const router = Router();

router.get('/search', searchPlacesHandler);


export {router as placesRoutes};
