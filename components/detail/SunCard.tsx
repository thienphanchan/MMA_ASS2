import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

interface Props {
  sunrise: number;
  sunset: number;
  timezone: number;
}

function formatTime(unix: number, timezone: number): string {
  const date = new Date((unix + timezone) * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m} ${ampm}`;
}

export function SunCard({ sunrise, sunset, timezone }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Ionicons name="sunny-outline" size={28} color="#FFD95A" />
        <Text style={styles.label}>Sunrise</Text>
        <Text style={styles.value}>{formatTime(sunrise, timezone)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Ionicons name="moon-outline" size={28} color="#A78BFA" />
        <Text style={styles.label}>Sunset</Text>
        <Text style={styles.value}>{formatTime(sunset, timezone)}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    // ...theme.shadow.card,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: theme.colors.borderGlass,
    marginHorizontal: theme.spacing.md,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.muted,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
});