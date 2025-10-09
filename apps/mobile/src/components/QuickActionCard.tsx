import { memo } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStore } from '../theme/themeStore';

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
  const theme = useThemeStore((state) => state.theme);

  return (
    <Pressable
      onPress={widget.onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View>
        <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>{widget.title}</Text>
        <Text style={[styles.description, theme === 'dark' && styles.descriptionDark]}>{widget.description}</Text>
      </View>
      <Text style={styles.cta}>{widget.actionLabel}</Text>
      {widget.meta ? <Text style={[styles.meta, theme === 'dark' && styles.metaDark]}>{widget.meta}</Text> : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dfe3f0',
    gap: 12
  },
  pressed: {
    opacity: 0.7
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#141824'
  },
  titleDark: {
    color: '#f8f9fb'
  },
  description: {
    fontSize: 15,
    color: '#4b5162'
  },
  descriptionDark: {
    color: '#c0c5d2'
  },
  cta: {
    fontSize: 14,
    fontWeight: '700',
    color: '#366fff'
  },
  meta: {
    fontSize: 12,
    color: '#4b5162'
  },
  metaDark: {
    color: '#c0c5d2'
  }
});
