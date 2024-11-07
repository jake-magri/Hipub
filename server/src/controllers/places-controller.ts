import { Request, Response } from 'express';
import { searchPlaces } from '../services/places-service.js';

// Endpoint to search for places based on a query
export const searchPlacesHandler = async (req: Request, res: Response) => {
  const {  lat, long } = req.query;

  if (!lat || !long ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const places = await searchPlaces(lat as string, long as string);
    return res.json(places);
  } catch (error) {
    return res.status(500).json({ error: "Error on line 16 of controller.ts" });
  }
};

// Endpoint to get details for a specific place
// export const getPlaceDetailsHandler = async (req: Request, res: Response) => {
//   const { placeId } = req.params;

//   if (!placeId) {
//     return res.status(400).json({ error: 'Missing placeId parameter' });
//   }

//   try {
//     const placeDetails = await getPlaceDetails(placeId);
//     return res.json(placeDetails);
//   } catch (error) {
//     return res.status(500).json({ error: 'Error on line 32 of controller.ts' });
//   }
// };
