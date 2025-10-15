import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeTokens } from '../theme/designTokens';
import { useThemeTokens } from '../hooks/useThemeTokens';

export function OfflineNotice() {
  const tokens = useThemeTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={styles.container} accessibilityRole="status">
      <Text style={styles.title}>You are offline</Text>
      <Text style={styles.message}>Showing cached data until connectivity is restored.</Text>
    </View>
  );
}

function createStyles(tokens: ThemeTokens) {
  return StyleSheet.create({
    container: {
      backgroundColor: tokens.statusBackground.warning,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginBottom: 12
    },
    title: {
      fontWeight: '700',
      color: tokens.status.warning
    },
    message: {
      color: tokens.textSecondary
    }
  });
}
