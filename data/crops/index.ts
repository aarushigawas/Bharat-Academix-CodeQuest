// Placeholder data for crops
// TODO: Replace with actual data from database or API

export interface Crop {
  id: string;
  name: string;
  growingSeason: string;
  waterRequirement: string;
  soilPreference: string[];
  expectedYield: number;
  marketPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const cropsData: Crop[] = [
  {
    id: '1',
    name: 'Rice',
    growingSeason: 'Kharif',
    waterRequirement: 'High',
    soilPreference: ['Clay', 'Loam'],
    expectedYield: 4500,
    marketPrice: 2500,
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'Wheat',
    growingSeason: 'Rabi',
    waterRequirement: 'Medium',
    soilPreference: ['Loam', 'Sandy Loam'],
    expectedYield: 3200,
    marketPrice: 2200,
    riskLevel: 'low',
  },
  {
    id: '3',
    name: 'Maize',
    growingSeason: 'Kharif',
    waterRequirement: 'Medium',
    soilPreference: ['Loam', 'Sandy Loam'],
    expectedYield: 3800,
    marketPrice: 1800,
    riskLevel: 'low',
  },
  {
    id: '4',
    name: 'Cotton',
    growingSeason: 'Kharif',
    waterRequirement: 'High',
    soilPreference: ['Black Soil', 'Loam'],
    expectedYield: 1500,
    marketPrice: 6000,
    riskLevel: 'high',
  },
];

export function getCropById(id: string): Crop | undefined {
  return cropsData.find(crop => crop.id === id);
}

export function getCropsBySeason(season: string): Crop[] {
  return cropsData.filter(crop => crop.growingSeason === season);
}
