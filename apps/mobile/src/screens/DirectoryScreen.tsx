import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FlatList, Linking, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { fetchDirectory } from '../services/mobileApi';

export function DirectoryScreen() {
  const [query, setQuery] = useState('');
  const isOnline = useNetworkStatus();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['directory'],
    queryFn: fetchDirectory
  });

  const directory = data?.data ?? [];
  const filtered = useMemo(() => {
    if (!query) {
      return directory;
    }
    const normalized = query.toLowerCase();
    return directory.filter((entry) =>
      [entry.name, entry.department, entry.location].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [directory, query]);

  return (
    <View style={styles.container}>
      {!isOnline && <OfflineNotice />}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name, department, or location"
        style={styles.search}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
            <View style={styles.details}>
              <Text style={styles.detail}>Department: {item.department}</Text>
              <Text style={styles.detail}>Location: {item.location}</Text>
              <Text style={styles.detail}>Skills: {item.skills.join(', ')}</Text>
            </View>
            <View style={styles.links}>
              <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                {item.email}
              </Text>
              <Text style={styles.link} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                {item.phone}
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.meta}>
            <Text style={styles.metaText}>{directory.length} people</Text>
            <Text style={styles.metaText}>Source: {data?.source ?? 'n/a'}</Text>
            {data?.stale ? <Text style={styles.metaWarning}>Data may be out of date</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No colleagues found. Adjust your filters.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fb',
    padding: 16
  },
  search: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dfe3f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#ffffff'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e3e7f2'
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  role: {
    marginTop: 4,
    color: '#4b5162'
  },
  details: {
    marginTop: 12,
    gap: 4
  },
  detail: {
    color: '#4b5162'
  },
  links: {
    marginTop: 12,
    gap: 6
  },
  link: {
    color: '#366fff',
    fontWeight: '600'
  },
  meta: {
    paddingHorizontal: 4,
    paddingBottom: 12,
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap'
  },
  metaText: {
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
