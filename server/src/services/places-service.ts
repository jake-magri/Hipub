import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const placesApiKey = process.env.GOOGLE_PLACES_API_
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/';

export const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await axios.get(`${GOOGLE_PLACES_URL}details/json`, {
      params: {
        placeid: placeId,
        key: placesApiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw new Error('Error fetching place details');
  }
};

export const searchPlaces = async (query: string, location: string, radius: number) => {
  try {
    const response = await axios.get(`${GOOGLE_PLACES_URL}textsearch/json`, {
      params: {
        query,
        location,
        radius,
        key: placesApiKey
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching places:', error);
    throw new Error('Error searching places');
  }
};
