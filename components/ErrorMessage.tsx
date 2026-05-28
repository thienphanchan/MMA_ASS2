import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  const isNotFound = message.toLowerCase().includes('not found');
  const isNetwork = message.toLowerCase().includes('internet') || message.toLowerCase().includes('network');

  const icon = isNotFound ? 'location-outline' : isNetwork ? 'wifi-outline' : 'alert-circle-outline';

  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={32} color={theme.colors.error} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.errorBg,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 107, 138, 0.30)',
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.sm,
    ...theme.shadow.card,
  },
  icon: {
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontSize: 15,
    color: theme.colors.error,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});