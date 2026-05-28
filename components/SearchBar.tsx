import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../constants/theme';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

export function SearchBar({ city, setCity, onSearch, loading = false }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city (e.g. Hanoi,VN)..."
        placeholderTextColor={theme.colors.text.muted}
        value={city}
        onChangeText={setCity}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="words"
        selectionColor={theme.colors.primary}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onSearch}
        disabled={loading || !city.trim()}
        activeOpacity={0.75}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.text.primary} />
        ) : (
          <Ionicons name="search" size={20} color={theme.colors.text.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardGlass,
    borderRadius: theme.radius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    ...theme.shadow.card,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.sm,
    letterSpacing: 0.3,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});