import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { fetchWorkflows } from '../services/mobileApi';

export function ServiceHubScreen() {
  const isOnline = useNetworkStatus();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['workflows'],
    queryFn: fetchWorkflows
  });

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

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f7f8fb'
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e3e7f2',
    gap: 6
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  status: {
    marginTop: 4,
    fontWeight: '700'
  },
  healthy: {
    color: '#1f7a3a'
  },
  unhealthy: {
    color: '#d93025'
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8
  },
  metaRow: {
    color: '#4b5162'
  },
  metaWarning: {
    color: '#c05621',
    fontWeight: '600'
  },
  empty: {
    textAlign: 'center',
    marginTop: 48,
    color: '#4b5162'
  }
});
