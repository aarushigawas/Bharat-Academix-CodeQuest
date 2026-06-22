import type { ForecastData } from '../types';

interface ForecastCardProps {
  forecast: ForecastData;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const date = new Date(forecast.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{dayName}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{dateStr}</p>
      
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {forecast.temperature.high}°
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {forecast.temperature.low}°
        </p>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{forecast.description}</p>
      
      {forecast.precipitation > 0 && (
        <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
          <span className="text-xs">💧 {forecast.precipitation}mm</span>
        </div>
      )}
    </div>
  );
}
