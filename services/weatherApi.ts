import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function normalizeCityName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function parseCityQuery(value: string): { city: string; country?: string } {
  const parts = value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    city: parts[0] ?? '',
    country: parts[1]?.toLowerCase(),
  };
}

export async function getWeather(city: string): Promise<WeatherData> {
  const inputCity = city.trim();

  try {
    const response = await axios.get<WeatherData>(BASE_URL, {
      params: {
        q: inputCity,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const query = parseCityQuery(inputCity);
    const isCityExactMatch =
      normalizeCityName(response.data.name) === normalizeCityName(query.city);
    const isCountryExactMatch =
      !query.country || response.data.sys.country.toLowerCase() === query.country;
    const isExactMatch = isCityExactMatch && isCountryExactMatch;

    if (!isExactMatch) {
      throw new Error(`City "${city}" not found as an exact match.`);
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('exact match')) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      if (error.request) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
    }
    throw new Error('Unexpected error. Please try again later.');
  }
}
// Thêm vào cuối file weatherApi.ts

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
}

export async function getForecast(city: string): Promise<ForecastData> {
  try {
    const response = await axios.get<ForecastData>(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          q: city.trim(),
          appid: API_KEY,
          units: 'metric',
          cnt: 40,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      if (error.request) {
        throw new Error('No internet connection.');
      }
    }
    throw new Error('Unexpected error. Please try again later.');
  }
}