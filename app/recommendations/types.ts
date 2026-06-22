export interface CropRecommendation {
  crop: string;
  suitabilityScore: number;
  expectedYield: number;
  riskAssessment: string;
  estimatedProfit: number;
  growingSeason: string;
  waterRequirement: string;
}
