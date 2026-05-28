import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ErrorMessage } from '../components/ErrorMessage';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { theme } from '../constants/theme';
import { useWeather } from '../hooks/useWeather';
import { getWeather } from '../services/weatherApi';
import { WeatherData } from '../types/weather';

const DEFAULT_CITIES = ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'London', 'Tokyo', 'New York'];

export default function HomeScreen() {
  const router = useRouter();
  const { city, weather, loading, error, setCity, searchWeather } = useWeather();
  const [defaultWeathers, setDefaultWeathers] = useState<WeatherData[]>([]);

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  const fetchDefaultCities = async () => {
    try {
      const results = await Promise.allSettled(
        DEFAULT_CITIES.map((c) => getWeather(c))
      );
      const data = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => (r as PromiseFulfilledResult<WeatherData>).value);
      setDefaultWeathers(data);
    } catch {
      // silent fail for default list
    }
  };

  const handleCardPress = (cityQuery: string) => {
    router.push(`/detail/${encodeURIComponent(cityQuery)}`);
  };

  return (
    <LinearGradient colors={theme.colors.background} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Weather</Text>
            <Text style={styles.subtitle}>Search any city worldwide</Text>
          </View>

          {/* Search */}
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={searchWeather}
            loading={loading}
          />

          {/* Search Error */}
          {error && <ErrorMessage message={error} />}

          {/* Search Result */}
          {weather && !error && (
            <>
              <Text style={styles.sectionTitle}>Search Result</Text>
              <WeatherCard
                weather={weather}
                onPress={() => handleCardPress(`${weather.name},${weather.sys.country}`)}
              />
            </>
          )}

          {/* Default City List */}
          <Text style={styles.sectionTitle}>
            {weather ? 'Popular Cities' : 'Popular Cities'}
          </Text>
          {defaultWeathers.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.loadingText}>Loading cities...</Text>
            </View>
          ) : (
            defaultWeathers.map((w) => (
              <WeatherCard
                key={w.name}
                weather={w}
                onPress={() => handleCardPress(`${w.name},${w.sys.country}`)}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 72,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: theme.colors.text.primary,
    letterSpacing: -1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    letterSpacing: 0.3,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xs,
  },
  centered: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  loadingText: {
    fontSize: 15,
    color: theme.colors.text.muted,
  },
});