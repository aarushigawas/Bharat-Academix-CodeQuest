'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MarketRecord {
  Commodity: string;
  Market: string;
  State: string;
  Modal_Price: string;
  Max_Price: string;
  Min_Price: string;
}

export default function MarketPage() {
  const [searchCrop, setSearchCrop] = useState('');
  const [marketData, setMarketData] = useState<MarketRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchCrop.trim()) return;

    setLoading(true);
    setError(null);
    setMarketData([]);

    try {
      const response = await fetch(`/api/recommend/market?crop=${encodeURIComponent(searchCrop)}`);
      if (!response.ok) throw new Error('Failed to fetch market data');
      
      const data = await response.json();
      setMarketData(data);
    } catch (err) {
      setError('Unable to fetch market data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Calculate insights from data
  const getInsights = () => {
    if (!marketData.length) return null;

    const modalPrices = marketData.map(r => parseFloat(r.Modal_Price));
    const maxPrice = Math.max(...modalPrices);
    const minPrice = Math.min(...modalPrices);
    const avgPrice = modalPrices.reduce((a, b) => a + b, 0) / modalPrices.length;

    const stateCounts = marketData.reduce((acc, r) => {
      acc[r.State] = (acc[r.State] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequentState = Object.entries(stateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const highestMarket = marketData.find(r => parseFloat(r.Modal_Price) === maxPrice)?.Market || 'N/A';

    return {
      highestMarket,
      avgPrice: avgPrice.toFixed(2),
      mostFrequentState,
    };
  };

  const insights = getInsights();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Market Insights
            </h1>
            <p className="text-xl md:text-2xl text-green-100">
              Explore agricultural commodity prices across Indian markets
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={searchCrop}
                onChange={(e) => setSearchCrop(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search crop (Wheat, Rice, Soyabean, Cotton, Maize...)"
                className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Loading...' : 'Get Market Data'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Fetching market data...</p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
              <p className="text-red-800 dark:text-red-300 text-lg">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && marketData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-6xl mb-4">🌾</div>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              Search a crop to explore market pricing data.
            </p>
          </motion.div>
        )}

        {/* Market Data Display */}
        {!loading && !error && marketData.length > 0 && (
          <>
            {/* Market Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">🌾</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {marketData[0].Commodity}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">Commodity Price Records</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Market Price</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{marketData[0].Modal_Price}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {marketData[0].Market}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">State</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {marketData[0].State}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Price Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {[
                {
                  label: 'Highest Price',
                  value: `₹${Math.max(...marketData.map(r => parseFloat(r.Max_Price)))}`,
                  color: 'green',
                },
                {
                  label: 'Lowest Price',
                  value: `₹${Math.min(...marketData.map(r => parseFloat(r.Min_Price)))}`,
                  color: 'red',
                },
                {
                  label: 'Modal Price',
                  value: `₹${marketData[0].Modal_Price}`,
                  color: 'blue',
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50 cursor-pointer`}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.label}</p>
                  <p className={`text-3xl font-bold text-${metric.color}-600 dark:text-${metric.color}-400`}>
                    {metric.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Market Insights Panel */}
            {insights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Market Price Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Highest recorded market</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{insights.highestMarket}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average modal price</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{insights.avgPrice}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Most frequent state</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{insights.mostFrequentState}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Market Records Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Agricultural Pricing Data
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                      <tr>
                        {['Market', 'State', 'Commodity', 'Min Price', 'Modal Price', 'Max Price'].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((record, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{record.Market}</td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.State}</td>
                          <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{record.Commodity}</td>
                          <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">₹{record.Min_Price}</td>
                          <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-semibold">₹{record.Modal_Price}</td>
                          <td className="px-6 py-4 text-purple-600 dark:text-purple-400 font-semibold">₹{record.Max_Price}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}