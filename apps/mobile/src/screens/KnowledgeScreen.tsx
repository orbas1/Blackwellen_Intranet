import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { fetchKnowledge } from '../services/mobileApi';

export function KnowledgeScreen() {
  const isOnline = useNetworkStatus();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['knowledge'],
    queryFn: fetchKnowledge
  });

  const articles = data?.data ?? [];

  return (
    <FlatList
      style={styles.list}
      data={articles}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          {!isOnline && <OfflineNotice />}
          <Text style={styles.metaRow}>Source: {data?.source ?? 'n/a'}</Text>
          {data?.stale ? <Text style={styles.metaWarning}>Data may be stale</Text> : null}
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <View style={styles.tags}>
            {item.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>
                #{tag}
              </Text>
            ))}
          </View>
          <Text style={styles.meta}>
            Updated {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })} · Owner: {item.author}
          </Text>
          <Text style={styles.status}>Status: {item.status}</Text>
        </View>
      )}
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
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e7f2',
    gap: 8
  },
  category: {
    color: '#4b5162',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600'
  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  },
  summary: {
    color: '#4b5162'
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  tag: {
    backgroundColor: '#ecf1ff',
    color: '#366fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: '600'
  },
  meta: {
    color: '#4b5162',
    fontSize: 12
  },
  status: {
    fontWeight: '600',
    color: '#141824'
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
  }
});
