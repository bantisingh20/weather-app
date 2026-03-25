import axios from "axios";
 
const URL = `https://api.geoapify.com/v1/geocode`;

export const fetchLocations = async (query) => { 
  try {
    const response = await axios.get(`${URL}/search`, {
      params: {
        text: query,
        limit: 15,
        apiKey: import.meta.env.VITE_GEOCODING_API_KEY,
      },
    });

    const arr = response.data.features.map((obj) => {
      const { suburb, city, state, country, lat, lon } = obj?.properties || {};

      const address = `${suburb ? `${suburb}, ` : ""}${city ? `${city}, ` : ""}${state}, ${country}`;

      return {
        label: address,
        value: {
          address,
          lat,
          lon,
        },
      };
    });

    return arr;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
 
export const fetchAddress = async (lat, lon) => { 

  try {
    const response = await axios.get(`${URL}/reverse`, {
      params: {
        lat,
        lon,
        apiKey: import.meta.env.VITE_GEOCODING_API_KEY,
      },
    });

    if (response.data?.features?.length > 0) {
      const { suburb, city, state, country, lat, lon } = response.data.features[0]?.properties || {};
      const address = `${suburb ? `${suburb}, ` : ""}${city ? `${city}, ` : ""}${state}, ${country}`;

      return { address, lat, lon };
    }

    return null;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};