import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { QuickActionCard } from '../components/QuickActionCard';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchWidgets } from '../services/mobileApi';

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const isOnline = useNetworkStatus();
  const { data, isLoading } = useQuery({
    queryKey: ['widgets'],
    queryFn: fetchWidgets
  });

  const handleOpenDirectory = useCallback(() => navigation.navigate('Directory'), [navigation]);
  const handleOpenKnowledge = useCallback(() => navigation.navigate('Knowledge'), [navigation]);
  const handleOpenServiceHub = useCallback(() => navigation.navigate('ServiceHub'), [navigation]);
  const handleOpenAnalytics = useCallback(() => navigation.navigate('Analytics'), [navigation]);

  return (
    <View style={styles.container}>
      {!isOnline && <OfflineNotice />}
      {isLoading ? <ActivityIndicator /> : null}
      {data?.data.map((widget) => (
        <QuickActionCard
          key={widget.id}
          widget={{
            id: widget.id,
            title: widget.title,
            description: widget.description,
            actionLabel: widget.actionLabel,
            onPress: widget.link ? () => Linking.openURL(widget.link!) : undefined,
            meta:
              data?.source === 'cache'
                ? 'Cached from last sync'
                : data?.source === 'fallback'
                  ? 'Offline defaults'
                  : 'Live data'
          }}
        />
      ))}
      <QuickActionCard
        widget={{
          id: 'directory',
          title: 'Directory',
          description: 'Find colleagues, view coverage by location, and start a call or message instantly.',
          actionLabel: 'Open directory',
          onPress: handleOpenDirectory
        }}
      />
      <QuickActionCard
        widget={{
          id: 'knowledge',
          title: 'Knowledge Hub',
          description: 'Review policy updates, attestation deadlines, and AI-curated knowledge packs.',
          actionLabel: 'Browse knowledge',
          onPress: handleOpenKnowledge
        }}
      />
      <QuickActionCard
        widget={{
          id: 'service',
          title: 'Service Hub',
          description: 'Submit requests, approve tickets, and monitor SLA health for operations teams.',
          actionLabel: 'Go to Service Hub',
          onPress: handleOpenServiceHub
        }}
      />
      <QuickActionCard
        widget={{
          id: 'analytics',
          title: 'Analytics intelligence',
          description: 'Review KPI trends, alerts, and reporting schedules while on the move.',
          actionLabel: 'Open analytics',
          onPress: handleOpenAnalytics
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f8fb',
    gap: 16
  }
});
