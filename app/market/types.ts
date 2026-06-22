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
