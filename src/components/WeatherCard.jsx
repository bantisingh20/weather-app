import { useWeather } from "../context/WeatherContext";
import {
  Sun,
  Sunset,
  Droplet,
  Cloud,
  Thermometer,
  EyeOff,
  Wind,
} from "lucide-react";

export default function WeatherCard() {
  const { weather, unit } = useWeather();

  if (!weather) return null;

  const tempUnit = unit === "C" ? "°C" : "°F";
  const feelsLike = weather.main.feels_like?.toFixed(1);
  const tempMin = weather.main.temp_min?.toFixed(1);
  const tempMax = weather.main.temp_max?.toFixed(1);

  const formatTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <section className="w-full rounded-xl bg-indigo-100 shadow-lg dark:bg-slate-500 p-5 flex flex-col justify-between">
 
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-semibold">{weather.name}</h1>
        <div className="text-5xl font-extrabold mt-2 sm:mt-0">
          {weather.main.temp.toFixed(1)} {tempUnit}
        </div>
      </header>

     
      <p className="capitalize text-lg mb-6">{weather.weather[0].description}</p>

 
      <div className="flex items-center gap-6 mb-8">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="w-24 h-24"
        />
        <div className="text-xl">
          Feels like: <strong>{feelsLike} {tempUnit}</strong>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <Sun className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Sunrise</p>
          <p>{formatTime(weather.sys.sunrise)}</p>
        </div>

        <div>
          <Sunset className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Sunset</p>
          <p>{formatTime(weather.sys.sunset)}</p>
        </div>

        <div>
          <Droplet className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Humidity</p>
          <p>{weather.main.humidity} %</p>
        </div>

        <div>
          <Cloud className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Clouds</p>
          <p>{weather.clouds.all} %</p>
        </div>

        <div>
          <Thermometer className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Pressure</p>
          <p>{weather.main.pressure} hPa</p>
        </div>

        <div>
          <EyeOff className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Visibility</p>
          <p>{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div>
          <Wind className="mx-auto mb-1" size={24} />
          <p className="font-semibold">Wind Speed</p>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div>
          <p className="font-semibold">Temp Min</p>
          <p> {tempMin} {tempUnit}</p>
        </div>
      </div>
    </section>
  );
}