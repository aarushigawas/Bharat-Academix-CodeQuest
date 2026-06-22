import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold">{weather.location}</h3>
          <p className="text-blue-100">{weather.description}</p>
        </div>
        <div className="text-5xl font-bold">{weather.temperature}°C</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-blue-100 text-sm">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Precipitation</p>
          <p className="text-xl font-semibold">{weather.precipitation}mm</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Wind</p>
          <p className="text-xl font-semibold">{weather.windSpeed}km/h</p>
        </div>
      </div>
    </div>
  );
}
