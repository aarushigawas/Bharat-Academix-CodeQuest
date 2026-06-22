export interface HistoricalRecommendation {
  id: string;
  date: string;
  crop: string;
  suitabilityScore: number;
  expectedYield: number;
  actualYield?: number;
  riskAssessment: string;
  estimatedProfit: number;
  actualProfit?: number;
  status: 'planned' | 'completed' | 'in-progress';
}

export interface HistoricalSummary {
  totalRecommendations: number;
  completedCrops: number;
  averageYield: number;
  totalProfit: number;
  accuracy: number;
}
