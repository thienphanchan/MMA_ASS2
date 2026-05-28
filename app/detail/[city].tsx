import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorMessage } from '../../components/ErrorMessage';
import { HeroCard } from '../../components/detail/HeroCard';
import { StatsGrid } from '../../components/detail/StatsGrid';
import { SunCard } from '../../components/detail/SunCard';
import { theme } from '../../constants/theme';
import { getWeather } from '../../services/weatherApi';
import { WeatherData } from '../../types/weather';

export default function DetailScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const router = useRouter();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(decodeURIComponent(city));
      setWeather(data);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={theme.colors.background} style={styles.gradient}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Fetching weather...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorWrap}>
          <ErrorMessage message={error} />
        </View>
      )}

      {weather && !loading && (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <HeroCard weather={weather} />
          <SunCard
            sunrise={weather.sys.sunrise}
            sunset={weather.sys.sunset}
            timezone={weather.timezone}
          />
          <StatsGrid weather={weather} />
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  backText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  loadingText: {
    fontSize: 15,
    color: theme.colors.text.muted,
  },
  errorWrap: {
    paddingHorizontal: theme.spacing.lg,
  },
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
});