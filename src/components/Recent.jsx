import { useWeather } from "../context/WeatherContext";
import { X } from "lucide-react";

export default function Recent() {
  const { recent, fetchWeather, removeRecent } = useWeather();

  const truncate = (text, max = 10) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };
  return (
    <div className="flex gap-2 flex-wrap mt-3">

      {recent.slice(0, 5).map((r, i) => (
        <div key={i} className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
          <span onClick={() => fetchWeather(r)} className="cursor-pointer"  title={r.address} >
            {truncate(r.address, 10)}
          </span>
          <X size={14} className="cursor-pointer hover:text-red-300" onClick={() => removeRecent(i)} />
        </div>
      ))}

    </div>
  );
}