// TODO: Initialize Supabase client with environment variables
// This will be used for database operations, user authentication, and data persistence
// TODO: Install @supabase/supabase-js package when ready to implement
// import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// TODO: Uncomment when package is installed
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = null as any;

// TODO: Add database types and interfaces
export interface FarmerProfile {
  id: string;
  user_id: string;
  location: string;
  soil_type: string;
  farm_size: number;
  water_availability: string;
  budget: number;
  risk_preference: string;
  created_at: string;
}

export interface RecommendationHistory {
  id: string;
  farmer_id: string;
  crop: string;
  suitability_score: number;
  expected_yield: number;
  risk_assessment: string;
  created_at: string;
}
