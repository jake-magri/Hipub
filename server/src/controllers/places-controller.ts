import axios from "axios";
import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

let placesData: string = "Finn doesn't have the customer's location. In Finn's response, ask for the location by either telling Finn in the chat or pressing the 'share locatioon' button and asking again.";

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

    // save data from Places API to a global variable for export
    console.log("This is the response from Google Places API:", response.data);
    placesData = JSON.stringify(response.data);
    console.log('placesData after assignment:', placesData); 

    // Send the data from Places API back to the frontend
    return res.status(200);
  } catch (error) {
    console.error("Error fetching nearby bars:", error);
    return res.status(500).json({ error: "Failed to fetch nearby bars" });
  }
};

export {placesData};