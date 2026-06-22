'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PlannerFormData } from './types';

export default function PlannerPage() {
  const [formData, setFormData] = useState<PlannerFormData>({
    location: '',
    soilType: '',
    farmSize: '',
    waterAvailability: '',
    budget: '',
    riskPreference: '',
  });

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Loamy', 'Sandy', 'Clay'];
  const waterOptions = ['High', 'Medium', 'Low'];
  const riskOptions = ['Low', 'Medium', 'High'];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    localStorage.setItem(
  "recommendation",
  JSON.stringify(data.response)
);

window.location.href = "/recommendations";

    console.log("Gemini Response:", data);


  } catch (error) {
    console.error(error);
    alert("Failed to get recommendation");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crop Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your farm details to get personalized crop recommendations
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your farm location"
              />
            </div>

            {/* Soil Type */}
            <div>
              <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Soil Type
              </label>
              <select
                id="soilType"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select soil type</option>
                {soilTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Farm Size */}
            <div>
              <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Farm Size (in acres)
              </label>
              <input
                type="number"
                id="farmSize"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                required
                min="0.1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter farm size"
              />
            </div>

            {/* Water Availability */}
            <div>
              <label htmlFor="waterAvailability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Water Availability
              </label>
              <select
                id="waterAvailability"
                name="waterAvailability"
                value={formData.waterAvailability}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select water availability</option>
                {waterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget (in INR)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="1000"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your budget"
              />
            </div>

            {/* Risk Preference */}
            <div>
              <label htmlFor="riskPreference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Preference
              </label>
              <select
                id="riskPreference"
                name="riskPreference"
                value={formData.riskPreference}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select risk preference</option>
                {riskOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get Recommendations
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
