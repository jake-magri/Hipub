import axios from "axios";
import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();


export const getNearbyBars = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  const radius = 5000; // radius is in meters so this is 5km from clients location.

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY; 
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bar&key=${apiKey}`
    );

    console.log("This is the ", response.data);
    // Send the data from Google Places API back to the frontend
    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching nearby bars:", error);
    return res.status(500).json({ error: "Failed to fetch nearby bars" });
  }
};
