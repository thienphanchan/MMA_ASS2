import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../constants/theme';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  onPress: () => void;
}

export function WeatherCard({ weather, onPress }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const locationLabel = `${weather.name}, ${weather.sys.country}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.city}>{locationLabel}</Text>
          <Text style={styles.status}>{weather.weather[0].description}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        </View>

        <Image
          source={{ uri: iconUrl }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardGlass,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    ...theme.shadow.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  city: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    letterSpacing: 0.4,
    marginBottom: theme.spacing.xs,
  },
  status: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
    letterSpacing: 0.3,
    marginBottom: theme.spacing.sm,
  },
  temp: {
    fontSize: 52,
    fontWeight: '300',
    color: theme.colors.text.primary,
    letterSpacing: -2,
  },
  icon: {
    width: 100,
    height: 100,
  },
});