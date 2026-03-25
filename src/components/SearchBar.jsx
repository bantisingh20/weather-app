import { useState } from "react";
import { fetchAddress, fetchLocations } from "../api/geolocation";
import { useWeather } from "../context/WeatherContext";
import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { fetchWeather, setUnit, unit, currentLocation } = useWeather();

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 2) {
      const res = await fetchLocations(val);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const loc = await fetchAddress(pos.coords.latitude, pos.coords.longitude);
        fetchWeather(loc);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    });
  };

  const handleToggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);

    if (currentLocation) {
      fetchWeather(currentLocation, newUnit);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full md:w-auto relative">

      <div className="flex items-center bg-white rounded px-3 py-2 w-full md:w-80">
        <Search className="text-gray-500 mr-2" size={18} />

        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search city..."
          className="w-full outline-none text-black"
        />
      </div>

      <button
        onClick={handleCurrentLocation}
        className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg hover:bg-gray-200"
      >
        <MapPin size={18} />
      </button>

      <button
        onClick={handleToggleUnit}
        className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
      >
        °{unit}
      </button>
      {results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-white text-black rounded shadow max-h-60 overflow-auto z-10">
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => {

                fetchWeather(r.value);
                setQuery(r.label);
                setResults([]);
              }}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}