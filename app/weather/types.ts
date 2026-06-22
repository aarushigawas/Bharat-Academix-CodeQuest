export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  description: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    high: number;
    low: number;
  };
  precipitation: number;
  description: string;
}
