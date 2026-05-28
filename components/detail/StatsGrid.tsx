import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../constants/theme';
import { WeatherData } from '../../types/weather';
import { StatCard } from './StatCard';

interface Props {
  weather: WeatherData;
}

function getWindDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function formatVisibility(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
}

export function StatsGrid({ weather }: Props) {
  const { main, wind, visibility, clouds } = weather;

  return (
    <View style={styles.grid}>
      <StatCard
        icon="water-outline"
        label="Humidity"
        value={`${main.humidity}%`}
        sub={main.humidity > 70 ? 'High' : main.humidity > 40 ? 'Moderate' : 'Low'}
      />
      <StatCard
        icon="speedometer-outline"
        label="Pressure"
        value={`${main.pressure}`}
        sub="hPa"
      />
      <StatCard
        icon="navigate-outline"
        label="Wind"
        value={`${Math.round(wind.speed * 3.6)} km/h`}
        sub={getWindDirection(wind.deg)}
      />
      <StatCard
        icon="eye-outline"
        label="Visibility"
        value={formatVisibility(visibility)}
      />
      <StatCard
        icon="cloud-outline"
        label="Clouds"
        value={`${clouds.all}%`}
        sub={clouds.all > 70 ? 'Overcast' : clouds.all > 30 ? 'Partly' : 'Clear'}
      />
      <StatCard
        icon="thermometer-outline"
        label="Feels Like"
        value={`${Math.round(main.feels_like)}°C`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.spacing.md,
  },
});