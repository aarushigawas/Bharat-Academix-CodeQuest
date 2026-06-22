'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import InfoCard from '@/components/cards/InfoCard';
import RecommendationExplanation from './components/RecommendationExplanation';

export default function RecommendationsPage() {
  const [recommendation, setRecommendation] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('recommendation');

    if (stored) {
      try {
        setRecommendation(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse recommendation:', error);
      }
    }
  }, []);

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          Loading recommendations...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crop Recommendations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalized crop suggestions based on your farm conditions
          </p>
        </div>

        {/* Top Recommendation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Recommendation
            </h2>

            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              {recommendation.confidence > 1
  ? Math.round(recommendation.confidence)
  : Math.round(recommendation.confidence * 100)}% Match
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <InfoCard
              title="Crop"
              value={recommendation.topCrop}
              subtitle="Best Match"
            />

            <InfoCard
              title="Expected Yield"
              value={recommendation.yield}
              subtitle="Per Season"
            />

            <InfoCard
              title="Estimated Profit"
              value={recommendation.profit}
              subtitle="Per Season"
              trend="up"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            <InfoCard
              title="Risk Assessment"
              value={recommendation.risk}
            />

            <InfoCard
              title="Water Requirement"
              value={recommendation.water}
            />

          </div>

          <RecommendationExplanation
            crop={recommendation.topCrop}
            explanation={`This crop was selected based on your location, soil type, water availability, budget, and risk preference.`}
          />

        </div>

        {/* Alternative Recommendations */}
        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Alternative Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {recommendation.alternatives?.map((rec: any) => (
              <div
                key={rec.crop}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {rec.crop}
                  </h3>

                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    {rec.confidence > 1
  ? Math.round(rec.confidence)
  : Math.round(rec.confidence * 100)}% Match
                  </span>

                </div>

                <div className="space-y-2">

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Confidence:
                    </span>

                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round(rec.confidence * 100)}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Type:
                    </span>

                    <span className="font-medium text-gray-900 dark:text-white">
                      Alternative Recommendation
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">

          <Link
            href="/planner"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Modify Inputs
          </Link>

          <Link
            href="/market"
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            View Market Data
          </Link>

        </div>

      </div>
    </div>
  );
}