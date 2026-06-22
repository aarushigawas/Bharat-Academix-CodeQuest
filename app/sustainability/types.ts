export interface SoilHealthMetrics {
  phLevel: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
}

export interface WaterConsumption {
  totalUsage: number;
  efficiency: number;
  irrigationMethod: string;
  savings: number;
}

export interface CropRotation {
  currentCrop: string;
  previousCrop: string;
  recommendedNextCrop: string;
  rotationBenefit: string;
}
