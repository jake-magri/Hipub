import axios from "axios";
import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();


export const getNearbyBars = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  const radius = 5000; // radius is in meters (5 km).

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bar&key=${apiKey}`
    );

    const placesArray: string[] = response.data.results.map((place: any) => {
      const name = place.name;
      const address = place.vicinity;
      const rating = place.rating || "No rating";
      return `${name}, ${address}, Rating: ${rating}`;
    });
    
    const placesString: string = placesArray.join(", ");

    // Send the data from Places API back to the frontend
    return res.status(200).json({ placesData: placesString });
  } catch (error) {
    console.error("Error fetching nearby bars:", error);
    return res.status(500).json({ error: "Failed to fetch nearby bars" });
  }
};