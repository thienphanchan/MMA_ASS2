import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';
import { WeatherData } from '../../types/weather';

interface Props {
  weather: WeatherData;
}

export function HeroCard({ weather }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{weather.name}</Text>
      <Text style={styles.countryName}>{weather.sys.country}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} resizeMode="contain" />
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.description}>
        {weather.weather[0].description.charAt(0).toUpperCase() +
          weather.weather[0].description.slice(1)}
      </Text>
      <View style={styles.minMaxRow}>
        <View style={styles.minMaxItem}>
          <Ionicons name="arrow-up" size={14} color="#FF6B6B" />
          <Text style={styles.minMaxText}>{Math.round(weather.main.temp_max)}°C</Text>
        </View>
        <View style={styles.dot} />
        <View style={styles.minMaxItem}>
          <Ionicons name="arrow-down" size={14} color="#74C0FC" />
          <Text style={styles.minMaxText}>{Math.round(weather.main.temp_min)}°C</Text>
        </View>
        <View style={styles.dot} />
        <View style={styles.minMaxItem}>
          <Ionicons name="body-outline" size={14} color={theme.colors.text.muted} />
          <Text style={styles.minMaxText}>Feels {Math.round(weather.main.feels_like)}°C</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardGlass,
    borderRadius: theme.radius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    padding: theme.spacing.lg,
    alignItems: 'center',
    // ...theme.shadow.card,
  },
  cityName: {
    fontSize: 30,
    fontWeight: '700',
    color: theme.colors.text.primary,
    letterSpacing: 0.4,
  },
  countryName: {
    fontSize: 14,
    color: theme.colors.text.muted,
    letterSpacing: 2,
    marginTop: 2,
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 68,
    fontWeight: '300',
    color: theme.colors.text.primary,
    letterSpacing: -3,
    marginTop: -8,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    letterSpacing: 0.3,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  minMaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  minMaxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  minMaxText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.borderGlass,
  },
});