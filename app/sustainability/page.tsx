import InfoCard from '@/components/cards/InfoCard';
import DashboardCard from '@/components/cards/DashboardCard';
import SustainabilityExplanation from './components/SustainabilityExplanation';
import type { SoilHealthMetrics, WaterConsumption, CropRotation } from './types';

// TODO: This will be replaced with actual data from the sustainability service
const mockSoilHealth: SoilHealthMetrics = {
  phLevel: 6.8,
  organicMatter: 2.5,
  nitrogen: 45,
  phosphorus: 28,
  potassium: 180,
  moisture: 65,
};

const mockWaterConsumption: WaterConsumption = {
  totalUsage: 4500,
  efficiency: 78,
  irrigationMethod: 'Drip Irrigation',
  savings: 25,
};

const mockCropRotation: CropRotation = {
  currentCrop: 'Rice',
  previousCrop: 'Wheat',
  recommendedNextCrop: 'Maize',
  rotationBenefit: 'Improves soil nitrogen levels and reduces pest buildup',
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sustainability Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor soil health, water consumption, and implement sustainable farming practices
          </p>
        </div>

        {/* Soil Health Metrics */}
        <DashboardCard title="Soil Health Metrics" className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <InfoCard
              title="pH Level"
              value={mockSoilHealth.phLevel}
              subtitle="Optimal: 6.0-7.0"
            />
            <InfoCard
              title="Organic Matter"
              value={`${mockSoilHealth.organicMatter}%`}
              subtitle="Good"
            />
            <InfoCard
              title="Nitrogen"
              value={`${mockSoilHealth.nitrogen} mg/kg`}
              subtitle="Medium"
            />
            <InfoCard
              title="Phosphorus"
              value={`${mockSoilHealth.phosphorus} mg/kg`}
              subtitle="Adequate"
            />
            <InfoCard
              title="Potassium"
              value={`${mockSoilHealth.potassium} mg/kg`}
              subtitle="High"
            />
            <InfoCard
              title="Moisture"
              value={`${mockSoilHealth.moisture}%`}
              subtitle="Optimal"
            />
          </div>
        </DashboardCard>

        {/* Water Consumption */}
        <DashboardCard title="Water Consumption" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title="Total Usage"
              value={`${mockWaterConsumption.totalUsage} m³`}
              subtitle="This season"
            />
            <InfoCard
              title="Efficiency"
              value={`${mockWaterConsumption.efficiency}%`}
              subtitle="Irrigation efficiency"
              trend="up"
            />
            <InfoCard
              title="Savings"
              value={`${mockWaterConsumption.savings}%`}
              subtitle="vs traditional methods"
              trend="up"
            />
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-900 dark:text-blue-300">
              <strong>Current Method:</strong> {mockWaterConsumption.irrigationMethod}
            </p>
          </div>
        </DashboardCard>

        {/* Crop Rotation */}
        <DashboardCard title="Crop Rotation Plan" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Previous Crop</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockCropRotation.previousCrop}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">Current Crop</p>
              <p className="text-xl font-semibold text-green-900 dark:text-green-300">{mockCropRotation.currentCrop}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recommended Next</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockCropRotation.recommendedNextCrop}</p>
            </div>
          </div>
          <SustainabilityExplanation
            topic="Rotation Benefits"
            explanation={mockCropRotation.rotationBenefit}
            bestPractices={[
              'Rotate crops with different nutrient requirements',
              'Include legumes to fix nitrogen',
              'Avoid planting same family crops consecutively',
              'Consider cover crops during off-season',
            ]}
          />
        </DashboardCard>

        {/* Sustainability Tips */}
        <DashboardCard title="Sustainability Best Practices">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SustainabilityExplanation
              topic="Soil Conservation"
              bestPractices={[
                'Use cover crops to prevent erosion',
                'Implement minimum tillage',
                'Add organic compost regularly',
                'Maintain ground cover',
              ]}
            />
            <SustainabilityExplanation
              topic="Water Management"
              bestPractices={[
                'Use drip irrigation systems',
                'Schedule irrigation based on weather',
                'Implement rainwater harvesting',
                'Monitor soil moisture levels',
              ]}
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
