// Placeholder data for market prices and trends
// TODO: Replace with actual data from market API

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface MarketTrend {
  crop: string;
  demand: 'high' | 'medium' | 'low';
  supply: 'high' | 'medium' | 'low';
  forecast: string;
}

export const marketPricesData: MarketPrice[] = [
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

export const marketTrendsData: MarketTrend[] = [
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

export function getMarketPrice(crop: string): MarketPrice | undefined {
  return marketPricesData.find(item => item.crop === crop);
}

export function getMarketTrend(crop: string): MarketTrend | undefined {
  return marketTrendsData.find(item => item.crop === crop);
}
