import { Router } from 'express';
import { searchPlacesHandler, getPlaceDetailsHandler } from '../../controllers/places-controller.js';

const router = Router();

router.get('/places/search', searchPlacesHandler);
router.get('/places/:placeId', getPlaceDetailsHandler);

export {router as placesRoutes};
