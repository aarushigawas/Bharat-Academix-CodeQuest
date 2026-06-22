import InfoCard from '@/components/cards/InfoCard';
import DashboardCard from '@/components/cards/DashboardCard';
import type { MarketPrice, MarketTrend } from './types';
import MarketAnalysis from './components/MarketAnalysis';

// TODO: This will be replaced with actual data from the market service
const mockMarketPrices: MarketPrice[] = [
  {
    crop: 'Rice',
    price: 2500,
    unit: 'per quintal',
    change: 5.2,
    trend: 'up',
    lastUpdated: new Date().toISOString(),
  },
  {
    crop: 'Wheat',
    price: 2200,
    unit: 'per quintal',
    change: -2.1,
    trend: 'down',
    lastUpdated: new Date().toISOString(),
  },
  {
    crop: 'Maize',
    price: 1800,
    unit: 'per quintal',
    change: 0.5,
    trend: 'stable',
    lastUpdated: new Date().toISOString(),
  },
  {
    crop: 'Cotton',
    price: 6000,
    unit: 'per quintal',
    change: 8.3,
    trend: 'up',
    lastUpdated: new Date().toISOString(),
  },
];

const mockMarketTrends: MarketTrend[] = [
  {
    crop: 'Rice',
    demand: 'high',
    supply: 'medium',
    forecast: 'Prices expected to remain stable with slight increase',
  },
  {
    crop: 'Wheat',
    demand: 'medium',
    supply: 'high',
    forecast: 'Prices may decrease due to surplus production',
  },
  {
    crop: 'Cotton',
    demand: 'high',
    supply: 'low',
    forecast: 'Strong upward trend expected',
  },
];

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time market prices and demand trends
          </p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMarketPrices.map((item) => (
            <InfoCard
              key={item.crop}
              title={item.crop}
              value={`₹${item.price}`}
              subtitle={`${item.unit} • ${item.change > 0 ? '+' : ''}${item.change}%`}
              trend={item.trend === 'up' ? 'up' : item.trend === 'down' ? 'down' : 'neutral'}
            />
          ))}
        </div>

        {/* Market Analysis Chart */}
        <DashboardCard title="Price Trends" className="mb-8">
          <MarketAnalysis
            crop="Rice"
            prices={[2400, 2450, 2480, 2500, 2520, 2500]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          />
        </DashboardCard>

        {/* Market Trends Table */}
        <DashboardCard title="Demand & Supply Analysis">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Crop</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Demand</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Supply</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Forecast</th>
                </tr>
              </thead>
              <tbody>
                {mockMarketTrends.map((trend) => (
                  <tr key={trend.crop} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{trend.crop}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        trend.demand === 'high' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        trend.demand === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {trend.demand}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        trend.supply === 'high' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        trend.supply === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {trend.supply}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{trend.forecast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
