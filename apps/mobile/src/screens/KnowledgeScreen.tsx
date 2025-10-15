import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { fetchKnowledge } from '../services/mobileApi';
import { useThemeTokens } from '../hooks/useThemeTokens';
import { ThemeTokens } from '../theme/designTokens';

export function KnowledgeScreen() {
  const isOnline = useNetworkStatus();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['knowledge'],
    queryFn: fetchKnowledge
  });
  const tokens = useThemeTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

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

function createStyles(tokens: ThemeTokens) {
  return StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: tokens.surfaceBackground
    },
    card: {
      margin: 16,
      padding: 16,
      borderRadius: 16,
      backgroundColor: tokens.surface,
      borderWidth: 1,
      borderColor: tokens.borderSubtle,
      gap: 8
    },
    category: {
      color: tokens.textMuted,
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: '600'
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: tokens.textPrimary
    },
    summary: {
      color: tokens.textSecondary
    },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6
    },
    tag: {
      backgroundColor: tokens.statusBackground.info,
      color: tokens.status.info,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontWeight: '600'
    },
    meta: {
      color: tokens.textSecondary,
      fontSize: 12
    },
    status: {
      fontWeight: '600',
      color: tokens.textPrimary
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
    }
  });
}
