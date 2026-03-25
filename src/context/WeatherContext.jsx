import { createContext, useContext, useState,useEffect } from "react";
import { GetCurrentWeather, GetForecast } from "../api/openweather";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recent")) || []
  );

  const removeRecent = (index) => {
    setRecent((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("recent", JSON.stringify(updated));
      return updated;
    });
  };

  const fetchWeather = async (location, customUnit) => {
    try {
      const unitToUse = customUnit || unit;
      setLoading(true);
      setCurrentLocation(location);
      const current = await GetCurrentWeather(location, unitToUse);
      const forecastData = await GetForecast(location, unitToUse);

      setWeather(current);

      const daily = forecastData.list?.filter((i) =>
        i.dt_txt.includes("12:00:00")
      );
      setForecast(daily || []);

      const updated = [location, ...recent.filter(r => r.lat !== location.lat)].slice(0, 5);
      setRecent(updated);
      localStorage.setItem("recent", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recent.length > 0) {
      fetchWeather(recent[0]);  
    } else {
      fetchWeather({ name: "Delhi", lat: 28.6139, lon: 77.2090 });
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{ weather, forecast, loading, fetchWeather, unit, setUnit, recent, removeRecent, currentLocation }}
    >
      {children}
    </WeatherContext.Provider>
  );
};