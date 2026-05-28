import { useState } from 'react';
import { getWeather } from '../services/weatherApi';
import { WeatherData } from '../types/weather';

interface UseWeatherReturn {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string) => void;
  searchWeather: () => Promise<void>;
}

export function useWeather(): UseWeatherReturn {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    weather,
    loading,
    error,
    setCity,
    searchWeather,
  };
}