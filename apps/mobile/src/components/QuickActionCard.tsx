import { memo, useMemo } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemeTokens } from '../theme/designTokens';
import { useThemeTokens } from '../hooks/useThemeTokens';

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  onPress?: (event: GestureResponderEvent) => void;
  meta?: string;
}

interface Props {
  widget: QuickAction;
}

export const QuickActionCard = memo(function QuickActionCard({ widget }: Props) {
  const tokens = useThemeTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <Pressable
      onPress={widget.onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.title}>{widget.title}</Text>
        <Text style={styles.description}>{widget.description}</Text>
      </View>
      <Text style={styles.cta}>{widget.actionLabel}</Text>
      {widget.meta ? <Text style={styles.meta}>{widget.meta}</Text> : null}
    </Pressable>
  );
});

function createStyles(tokens: ThemeTokens) {
  return StyleSheet.create({
    container: {
      padding: 20,
      borderRadius: 20,
      backgroundColor: tokens.surface,
      borderWidth: 1,
      borderColor: tokens.border,
      gap: 12,
      shadowColor: tokens.raisedCardShadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 2
    },
    pressed: {
      opacity: 0.72
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: tokens.textPrimary
    },
    description: {
      fontSize: 15,
      color: tokens.textSecondary
    },
    cta: {
      fontSize: 14,
      fontWeight: '700',
      color: tokens.accentPrimary
    },
    meta: {
      fontSize: 12,
      color: tokens.textMuted
    }
  });
}
