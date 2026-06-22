export interface FarmerInput {
  location: string;
  soilType: string;
  farmSize: number;
  farmSizeUnit: string;
  waterAvailability: string;
  budget: number;
  riskPreference: string;
}

export interface PlannerFormData {
  location: string;
  soilType: string;
  farmSize: string;
  waterAvailability: string;
  budget: string;
  riskPreference: string;
}
