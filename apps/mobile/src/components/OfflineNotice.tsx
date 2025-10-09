import { StyleSheet, Text, View } from 'react-native';

export function OfflineNotice() {
  return (
    <View style={styles.container} accessibilityRole="status">
      <Text style={styles.title}>You are offline</Text>
      <Text style={styles.message}>Showing cached data until connectivity is restored.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5d0c5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  title: {
    fontWeight: '700',
    color: '#8a3c2f'
  },
  message: {
    color: '#8a3c2f'
  }
});
