import axios from "axios";
import { WeatherData } from "../types/weather";

function getRequiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

const API_KEY = getRequiredEnv(
  "EXPO_PUBLIC_API_KEY",
  process.env.EXPO_PUBLIC_API_KEY,
);
const BASE_URL = getRequiredEnv(
  "EXPO_PUBLIC_API_URL",
  process.env.EXPO_PUBLIC_API_URL,
);
const FORECAST_URL = getRequiredEnv(
  "EXPO_PUBLIC_FORECAST_URL",
  process.env.EXPO_PUBLIC_FORECAST_URL,
);

function normalizeCityName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function parseCityQuery(value: string): { city: string; country?: string } {
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    city: parts[0] ?? "",
    country: parts[1]?.toLowerCase(),
  };
}

export async function getWeather(city: string): Promise<WeatherData> {
  const inputCity = city.trim();

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: inputCity,
        appid: API_KEY,
        units: "metric",
      },
    });
    const weatherData = response.data as WeatherData;

    const query = parseCityQuery(inputCity);
    const isCityExactMatch =
      normalizeCityName(weatherData.name) === normalizeCityName(query.city);
    const isCountryExactMatch =
      !query.country || weatherData.sys.country.toLowerCase() === query.country;
    const isExactMatch = isCityExactMatch && isCountryExactMatch;

    if (!isExactMatch) {
      throw new Error(`City "${city}" not found as an exact match.`);
    }

    return weatherData;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("exact match")) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(
          `City "${city}" not found. Please check the spelling and try again.`,
        );
      }
      if (error.request) {
        throw new Error(
          "No internet connection. Please check your network and try again.",
        );
      }
    }
    throw new Error("Unexpected error. Please try again later.");
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
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: "metric",
        cnt: 40,
      },
    });
    return response.data as ForecastData;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      if (error.request) {
        throw new Error("No internet connection.");
      }
    }
    throw new Error("Unexpected error. Please try again later.");
  }
}