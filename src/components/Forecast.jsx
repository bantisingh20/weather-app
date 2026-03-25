import { useWeather } from "../context/WeatherContext";

export default function Forecast() {
  const { forecast, unit } = useWeather();
  const newUnit = unit === "C" ? "°F" : "°C";
   

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
      {forecast.map((item, i) => (
        <div
          key={i}
          className="bg-white/20 backdrop-blur rounded-lg p-4 flex flex-col items-center text-white shadow-md"
        >
          <p className="font-semibold mb-2">{formatDate(item.dt_txt)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            className="w-16 h-16 mb-2"
          />
          <p className="text-lg font-bold mb-1">
            {Math.round(item.main.temp)} {newUnit}
          </p>
          <p className="capitalize text-sm">{item.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}