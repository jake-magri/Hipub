import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const placesApiKey = process.env.GOOGLE_PLACES_API_;
const GOOGLE_PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
  
export const searchPlaces = async (latitude: any, longitude: any) => {
  try {
    const response = await axios.get(
      `${GOOGLE_PLACES_URL}${latitude},${longitude}&radius=<5000>&type=bar&key=${placesApiKey}`,
      {
        params: {
          latitude,
          longitude,
          key: placesApiKey,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching places:", error);
    throw new Error("Error searching places");
  }
};

// export const getPlaceDetails = async (placeId: string) => {
//   try {
//     const response = await axios.get(`${GOOGLE_PLACES_URL}details/json`, {
//       params: {
//         placeid: placeId,
//         key: placesApiKey,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching place details:", error);
//     throw new Error("Error fetching place details");
//   }
// };

