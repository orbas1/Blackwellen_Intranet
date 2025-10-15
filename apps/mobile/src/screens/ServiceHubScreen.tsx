import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { fetchWorkflows } from '../services/mobileApi';
import { useThemeTokens } from '../hooks/useThemeTokens';
import { ThemeTokens } from '../theme/designTokens';

export function ServiceHubScreen() {
  const isOnline = useNetworkStatus();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['workflows'],
    queryFn: fetchWorkflows
  });
  const tokens = useThemeTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const workflows = data?.data ?? [];

  return (
    <FlatList
      style={styles.list}
      data={workflows}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          {!isOnline && <OfflineNotice />}
          <Text style={styles.metaRow}>Source: {data?.source ?? 'n/a'}</Text>
          {data?.stale ? <Text style={styles.metaWarning}>SLA data may be stale</Text> : null}
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>SLA: {item.slaHours}h</Text>
          <Text>Queue depth: {item.queueDepth}</Text>
          <Text style={[styles.status, item.healthy ? styles.healthy : styles.unhealthy]}>
            {item.healthy ? 'Healthy' : 'Action required'}
          </Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No workflows available.</Text>}
    />
  );
}

function createStyles(tokens: ThemeTokens) {
  return StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: tokens.surfaceBackground
    },
    card: {
      margin: 16,
      padding: 16,
      backgroundColor: tokens.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: tokens.borderSubtle,
      gap: 6
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: tokens.textPrimary
    },
    status: {
      marginTop: 4,
      fontWeight: '700'
    },
    healthy: {
      color: tokens.status.success
    },
    unhealthy: {
      color: tokens.status.danger
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 8
    },
    metaRow: {
      color: tokens.textSecondary
    },
    metaWarning: {
      color: tokens.status.warning,
      fontWeight: '600'
    },
    empty: {
      textAlign: 'center',
      marginTop: 48,
      color: tokens.textSecondary
    }
  });
}
