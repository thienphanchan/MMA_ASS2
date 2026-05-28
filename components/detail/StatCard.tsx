import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

interface Props {
  icon: any;
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ icon, label, value, sub }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: theme.colors.cardGlass,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    padding: theme.spacing.md,
    alignItems: 'flex-start',
    gap: 4,
    ...theme.shadow.card,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.muted,
    letterSpacing: 0.5,
    marginTop: theme.spacing.xs,
  },
  value: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  sub: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    letterSpacing: 0.3,
  },
});