import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import Recent from "../components/Recent";
import { useWeather } from "../context/WeatherContext";

export default function Home() {
  const { loading } = useWeather();

  return (
    <div className="transition-all duration-300 min-h-screen min-w-full bg-indigo-100 dark:bg-gray-900 text-black dark:text-white px-6 py-2 sm:px-10 sm:py-4 md:px-14 md:py-6 lg:px-20 lg:py-9 xl:px-24 xl:py-11">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">
          Weather Dashboard
        </h1>

        <SearchBar />
      </div>

      <div className="mt-4">
        <Recent />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading spinner"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="ml-3 text-lg font-medium text-indigo-700 dark:text-indigo-300">
            Loading weather...
          </span>
        </div>
      ) : <>
        <div className="mt-6 space-y-8">
          <WeatherCard />
          <Forecast />
        </div>
      </>
      }


    </div>
  );
}