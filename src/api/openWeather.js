import axios from "axios";

const baseURL = 'https://api.openweathermap.org/data/2.5/';
 
export const GetCurrentWeather = async (location, unit) => {
  const unitVal = unit === 'C' ? 'metric' : 'imperial';
  const URL = `${baseURL}weather`;

  try {
    const response = await axios.get(URL, {
      params: {
        lat: location.lat,
        lon: location.lon,
        units: unitVal,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {};
  }
};
 
export const GetForecast = async (location, unit) => {
  const unitVal = unit === 'C' ? 'metric' : 'imperial';
  const URL = `${baseURL}forecast`;

  try {
    const response = await axios.get(URL, {
      params: {
        lat: location.lat,
        lon: location.lon,
        units: unitVal,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return {};
  }
};
 