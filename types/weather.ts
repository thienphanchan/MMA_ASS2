export interface Weather {
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  name: string;
  main: Main;
  wind: Wind;
  weather: Weather[];
  visibility: number;
  clouds: { all: number };
  sys: Sys;
  timezone: number;
  dt: number;
}