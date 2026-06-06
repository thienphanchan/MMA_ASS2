import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '../../constants/theme';
import { ForecastItem } from '../../services/weatherApi';

interface Props {
  forecast: ForecastItem[];
  currentTemp: number; // nhận temp thực từ HeroCard
}

function getDayLabel(dtTxt: string): string {
  const date = new Date(dtTxt);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function ForecastStrip({ forecast, currentTemp }: Props) {
  // Lấy ngày hôm nay
  const todayDate = new Date().toISOString().split('T')[0];

  // Lấy 1 item đại diện mỗi ngày (ưu tiên 12:00, fallback item đầu tiên của ngày)
  const dailyMap = new Map<string, ForecastItem>();

  forecast.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, item);
    }
    // Ưu tiên slot 12:00:00
    if (item.dt_txt.includes('12:00:00')) {
      dailyMap.set(date, item);
    }
  });

  const daily = Array.from(dailyMap.values()).slice(0, 7);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Day Forecast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {daily.map((item, index) => {
          const isToday = item.dt_txt.split(' ')[0] === todayDate;
          // Today dùng currentTemp thực từ API weather
          const displayTemp = isToday ? currentTemp : item.main.temp;

          return (
            <View key={item.dt} style={[styles.card, isToday && styles.cardToday]}>
              <Text style={[styles.day, isToday && styles.dayToday]}>
                {isToday ? 'Today' : getDayLabel(item.dt_txt)}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                }}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.desc}>{item.weather[0].main}</Text>
              <Text style={styles.temp}>{Math.round(displayTemp)}°</Text>
              <View style={styles.minMaxRow}>
                <Text style={styles.tempMax}>↑{Math.round(item.main.temp_max)}°</Text>
                <Text style={styles.tempMin}>↓{Math.round(item.main.temp_min)}°</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    letterSpacing: 0.4,
    marginBottom: theme.spacing.xs,
  },
  scrollContent: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.cardGlass,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    width: 100,
    gap: 4,
    // ...theme.shadow.card,
  },
  cardToday: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(77, 166, 255, 0.15)',
  },
  day: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.primary,
    letterSpacing: 0.3,
  },
  dayToday: {
    color: theme.colors.primary,
  },
  icon: {
    width: 52,
    height: 52,
  },
  desc: {
    fontSize: 11,
    color: theme.colors.text.muted,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  temp: {
    fontSize: 22,
    fontWeight: '300',
    color: theme.colors.text.primary,
    letterSpacing: -1,
  },
  minMaxRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  tempMax: {
    fontSize: 11,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  tempMin: {
    fontSize: 11,
    color: '#74C0FC',
    fontWeight: '500',
  },
});