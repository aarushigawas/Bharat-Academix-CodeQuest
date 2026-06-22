import InfoCard from '@/components/cards/InfoCard';
import DashboardCard from '@/components/cards/DashboardCard';
import type { HistoricalRecommendation, HistoricalSummary } from './types';

// TODO: This will be replaced with actual data from the database
const mockHistoricalData: HistoricalRecommendation[] = [
  {
    id: '1',
    date: '2024-01-15',
    crop: 'Wheat',
    suitabilityScore: 85,
    expectedYield: 3200,
    actualYield: 3150,
    riskAssessment: 'Low',
    estimatedProfit: 38000,
    actualProfit: 37500,
    status: 'completed',
  },
  {
    id: '2',
    date: '2023-10-20',
    crop: 'Rice',
    suitabilityScore: 78,
    expectedYield: 4500,
    actualYield: 4600,
    riskAssessment: 'Medium',
    estimatedProfit: 45000,
    actualProfit: 47000,
    status: 'completed',
  },
  {
    id: '3',
    date: '2023-07-10',
    crop: 'Maize',
    suitabilityScore: 82,
    expectedYield: 3800,
    actualYield: 3700,
    riskAssessment: 'Low',
    estimatedProfit: 32000,
    actualProfit: 31000,
    status: 'completed',
  },
  {
    id: '4',
    date: '2023-04-05',
    crop: 'Cotton',
    suitabilityScore: 75,
    expectedYield: 1500,
    riskAssessment: 'High',
    estimatedProfit: 60000,
    status: 'completed',
  },
];

const mockSummary: HistoricalSummary = {
  totalRecommendations: 4,
  completedCrops: 4,
  averageYield: 3362,
  totalProfit: 145500,
  accuracy: 95,
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Farm History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your previous recommendations, yields, and profits
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard
            title="Total Recommendations"
            value={mockSummary.totalRecommendations}
            subtitle="All time"
          />
          <InfoCard
            title="Completed Crops"
            value={mockSummary.completedCrops}
            subtitle="Successfully harvested"
            trend="up"
          />
          <InfoCard
            title="Average Yield"
            value={`${mockSummary.averageYield} kg/acre`}
            subtitle="Per season"
            trend="up"
          />
          <InfoCard
            title="Total Profit"
            value={`₹${mockSummary.totalProfit.toLocaleString()}`}
            subtitle="All time"
            trend="up"
          />
        </div>

        {/* Accuracy Card */}
        <DashboardCard title="Prediction Accuracy" className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Our recommendations have been
              </p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {mockSummary.accuracy}% accurate
              </p>
            </div>
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                {mockSummary.accuracy}%
              </span>
            </div>
          </div>
        </DashboardCard>

        {/* Historical Recommendations Table */}
        <DashboardCard title="Recommendation History">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Crop</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Suitability</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Expected Yield</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Actual Yield</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Est. Profit</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Actual Profit</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHistoricalData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{item.date}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{item.crop}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        item.suitabilityScore >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.suitabilityScore >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {item.suitabilityScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{item.expectedYield} kg</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {item.actualYield ? `${item.actualYield} kg` : '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">₹{item.estimatedProfit.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {item.actualProfit ? `₹${item.actualProfit.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
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
