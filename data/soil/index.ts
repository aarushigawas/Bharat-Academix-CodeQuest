// Placeholder data for soil types
// TODO: Replace with actual data from database or API

export interface SoilType {
  id: string;
  name: string;
  phRange: string;
  nutrients: string[];
  suitableCrops: string[];
  waterRetention: string;
}

export const soilTypesData: SoilType[] = [
  {
    id: '1',
    name: 'Alluvial Soil',
    phRange: '6.5 - 7.5',
    nutrients: ['Nitrogen', 'Phosphorus', 'Potassium'],
    suitableCrops: ['Rice', 'Wheat', 'Maize', 'Sugarcane'],
    waterRetention: 'High',
  },
  {
    id: '2',
    name: 'Black Soil',
    phRange: '7.0 - 8.5',
    nutrients: ['Calcium', 'Magnesium', 'Potassium'],
    suitableCrops: ['Cotton', 'Soybean', 'Wheat', 'Gram'],
    waterRetention: 'Very High',
  },
  {
    id: '3',
    name: 'Red Soil',
    phRange: '5.5 - 7.0',
    nutrients: ['Iron', 'Aluminum'],
    suitableCrops: ['Groundnut', 'Millets', 'Pulses'],
    waterRetention: 'Low',
  },
  {
    id: '4',
    name: 'Loamy Soil',
    phRange: '6.0 - 7.0',
    nutrients: ['Balanced nutrients'],
    suitableCrops: ['Vegetables', 'Fruits', 'Wheat', 'Rice'],
    waterRetention: 'Medium',
  },
];

export function getSoilById(id: string): SoilType | undefined {
  return soilTypesData.find(soil => soil.id === id);
}
