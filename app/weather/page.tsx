import DashboardCard from '@/components/cards/DashboardCard';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import type { WeatherData, ForecastData } from './types';

// TODO: This will be replaced with actual data from the weather service
const mockCurrentWeather: WeatherData = {
  location: 'Punjab, India',
  temperature: 28,
  humidity: 65,
  precipitation: 0,
  windSpeed: 12,
  description: 'Partly cloudy',
};

const mockForecast: ForecastData[] = [
  {
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 30, low: 22 },
    precipitation: 0,
    description: 'Sunny',
  },
  {
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 29, low: 21 },
    precipitation: 5,
    description: 'Light rain',
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 27, low: 20 },
    precipitation: 15,
    description: 'Rainy',
  },
  {
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 28, low: 21 },
    precipitation: 2,
    description: 'Partly cloudy',
  },
  {
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 30, low: 23 },
    precipitation: 0,
    description: 'Sunny',
  },
  {
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 31, low: 24 },
    precipitation: 0,
    description: 'Sunny',
  },
  {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    temperature: { high: 29, low: 22 },
    precipitation: 8,
    description: 'Light rain',
  },
];

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Weather Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Current weather conditions and 7-day forecast
          </p>
        </div>

        {/* Current Weather */}
        <div className="mb-8">
          <WeatherCard weather={mockCurrentWeather} />
        </div>

        {/* 7-Day Forecast */}
        <DashboardCard title="7-Day Forecast" className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {mockForecast.map((forecast, index) => (
              <ForecastCard key={index} forecast={forecast} />
            ))}
          </div>
        </DashboardCard>

        {/* Irrigation Advice */}
        <DashboardCard title="Irrigation Advice">
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                Current Recommendation
              </h4>
              <p className="text-green-800 dark:text-green-300">
                Based on current weather conditions and forecast, maintain regular irrigation schedule.
                Light rain expected in 2-3 days may reduce irrigation needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Today</h5>
                <p className="text-sm text-blue-800 dark:text-blue-300">Normal irrigation required</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Next 2 Days</h5>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">Reduce irrigation by 20%</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 dark:text-purple-300 mb-1">Next Week</h5>
                <p className="text-sm text-purple-800 dark:text-purple-300">Monitor soil moisture closely</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
