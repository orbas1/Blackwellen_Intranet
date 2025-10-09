import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OfflineNotice } from '../components/OfflineNotice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  AnalyticsDatasetKey,
  AnalyticsAlert,
  AnalyticsQueryParams,
  AnalyticsSegment,
  AnalyticsSnapshot,
  AnalyticsTimeframe,
  fetchAnalyticsSnapshot
} from '../services/mobileApi';

const DATASETS: { key: AnalyticsDatasetKey; label: string }[] = [
  { key: 'engagement', label: 'Engagement' },
  { key: 'service', label: 'Service' },
  { key: 'finance', label: 'Finance' }
];

const TIMEFRAMES: { key: AnalyticsTimeframe; label: string }[] = [
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' }
];

const SEGMENTS: { key: AnalyticsSegment; label: string }[] = [
  { key: 'global', label: 'Global' },
  { key: 'emea', label: 'EMEA' },
  { key: 'apac', label: 'APAC' },
  { key: 'amer', label: 'Americas' }
];

const INITIAL_PARAMS: AnalyticsQueryParams = {
  dataset: 'engagement',
  timeframe: '30d',
  segment: 'global'
};

function formatValue(kpi: AnalyticsSnapshot['kpis'][number]) {
  switch (kpi.unit) {
    case 'percentage':
      return `${(kpi.value * 100).toFixed(1)}%`;
    case 'currency':
      return kpi.value >= 1_000_000 ? `$${(kpi.value / 1_000_000).toFixed(1)}M` : `$${(kpi.value / 1_000).toFixed(0)}K`;
    case 'duration':
      return `${kpi.value.toFixed(1)} hrs`;
    default:
      return kpi.value.toLocaleString();
  }
}

function formatDelta(kpi: AnalyticsSnapshot['kpis'][number]) {
  const sign = kpi.delta > 0 ? '+' : '';
  switch (kpi.unit) {
    case 'percentage':
      return `${sign}${(kpi.delta * 100).toFixed(1)}pp`;
    case 'currency':
      return `${sign}$${(Math.abs(kpi.delta) / 1_000).toFixed(0)}K`;
    case 'duration':
      return `${sign}${Math.abs(kpi.delta).toFixed(1)} hrs`;
    default:
      return `${sign}${Math.round(Math.abs(kpi.delta)).toLocaleString()}`;
  }
}

function statusColour(status: AnalyticsSnapshot['kpis'][number]['status']) {
  switch (status) {
    case 'exceeding':
      return '#0f9d58';
    case 'on-track':
      return '#1a73e8';
    case 'watch':
      return '#fbbc05';
    case 'at-risk':
      return '#d93025';
    default:
      return '#596177';
  }
}

const ALERT_BACKGROUND: Record<AnalyticsAlert['severity'], string> = {
  critical: '#fdecea',
  high: '#fff4e5',
  medium: '#e8f0fe',
  low: '#edf5f1'
};

export function AnalyticsScreen({}: NativeStackScreenProps<RootStackParamList, 'Analytics'>) {
  const isOnline = useNetworkStatus();
  const [params, setParams] = useState<AnalyticsQueryParams>(INITIAL_PARAMS);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['analytics-mobile', params],
    queryFn: () => fetchAnalyticsSnapshot(params),
    keepPreviousData: true
  });

  const snapshot = useMemo(() => data?.data, [data]);
  const handleDatasetChange = useCallback((key: AnalyticsDatasetKey) => {
    setParams((prev) => ({ ...prev, dataset: key }));
  }, []);
  const handleTimeframeChange = useCallback((key: AnalyticsTimeframe) => {
    setParams((prev) => ({ ...prev, timeframe: key }));
  }, []);
  const handleSegmentChange = useCallback((key: AnalyticsSegment) => {
    setParams((prev) => ({ ...prev, segment: key }));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isOnline && <OfflineNotice />}
      <Text style={styles.title}>Analytics intelligence</Text>
      <Text style={styles.subtitle}>
        Track KPIs, view live alerts, and review scheduled digests for your workforce, operations, and finance domains.
      </Text>

      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Dataset</Text>
        <View style={styles.filterRow}>
          {DATASETS.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.filterButton, params.dataset === option.key && styles.filterButtonActive]}
              onPress={() => handleDatasetChange(option.key)}
            >
              <Text style={params.dataset === option.key ? styles.filterTextActive : styles.filterText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.filterLabel}>Timeframe</Text>
        <View style={styles.filterRow}>
          {TIMEFRAMES.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.filterButton, params.timeframe === option.key && styles.filterButtonActive]}
              onPress={() => handleTimeframeChange(option.key)}
            >
              <Text style={params.timeframe === option.key ? styles.filterTextActive : styles.filterText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.filterLabel}>Segment</Text>
        <View style={styles.filterRow}>
          {SEGMENTS.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.filterButton, params.segment === option.key && styles.filterButtonActive]}
              onPress={() => handleSegmentChange(option.key)}
            >
              <Text style={params.segment === option.key ? styles.filterTextActive : styles.filterText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {isLoading ? <ActivityIndicator /> : null}

      {snapshot && (
        <View style={styles.section}>
          <View style={styles.snapshotMeta}>
            <Text style={styles.snapshotTitle}>{snapshot.datasetName}</Text>
            <Text style={styles.snapshotMetaText}>
              Updated {snapshot.segment.toUpperCase()} · {snapshot.timeframe.toUpperCase()} · Lag {snapshot.lagMinutes}m
            </Text>
            <Text style={styles.snapshotMetaText}>Source: {data?.source === 'cache' ? 'cached' : data?.source}</Text>
          </View>

          <View style={styles.kpiGrid}>
            {snapshot.kpis.map((kpi) => (
              <View key={kpi.id} style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
                <Text style={[styles.kpiValue, { color: statusColour(kpi.status) }]}>{formatValue(kpi)}</Text>
                <Text style={styles.kpiDelta}>
                  {formatDelta(kpi)} {kpi.comparisonPeriod}
                </Text>
                <Text style={styles.kpiStatus}>{kpi.status.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          <View style={styles.highlights}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {snapshot.highlights.map((highlight, index) => (
              <Text key={index} style={styles.highlightText}>
                • {highlight}
              </Text>
            ))}
          </View>

          <View style={styles.alertSection}>
            <Text style={styles.sectionTitle}>Alerts</Text>
            {snapshot.alerts.length === 0 ? (
              <Text style={styles.muted}>No active alerts for this view.</Text>
            ) : (
              snapshot.alerts.map((alert) => (
                <View key={alert.id} style={styles.alertCard}>
                  <View>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertDescription}>{alert.description}</Text>
                    <Text style={styles.alertImpact}>{alert.impact}</Text>
                    <Text style={styles.alertOwner}>Owner: {alert.owner}</Text>
                  </View>
                  <View style={[styles.alertBadge, { backgroundColor: ALERT_BACKGROUND[alert.severity] }]}>
                    <Text style={styles.alertBadgeText}>{alert.severity.toUpperCase()}</Text>
                    <Text style={styles.alertBadgeText}>{alert.slaHours}h SLA</Text>
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Scheduled reports</Text>
            {snapshot.schedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleCard}>
                <View>
                  <Text style={styles.scheduleName}>{schedule.name}</Text>
                  <Text style={styles.scheduleMeta}>
                    {schedule.cadence.toUpperCase()} · {schedule.deliveryFormat.toUpperCase()}
                  </Text>
                  <Text style={styles.scheduleMeta}>Next: {new Date(schedule.nextRunAt).toLocaleString()}</Text>
                </View>
                <Text style={schedule.enabled ? styles.scheduleEnabled : styles.schedulePaused}>
                  {schedule.enabled ? 'ENABLED' : 'PAUSED'}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.mobileSecurity}>
            <Text style={styles.sectionTitle}>Mobile security</Text>
            <View style={styles.securityRow}>
              <View style={styles.securityTile}>
                <Text style={styles.securityValue}>{snapshot.mobileSecurity.compliantDevices}</Text>
                <Text style={styles.securityLabel}>Compliant</Text>
              </View>
              <View style={styles.securityTile}>
                <Text style={styles.securityValue}>{snapshot.mobileSecurity.pendingRemediations}</Text>
                <Text style={styles.securityLabel}>Remediations</Text>
              </View>
              <View style={styles.securityTile}>
                <Text style={styles.securityValue}>{Math.round(snapshot.mobileSecurity.pushOptInRate * 100)}%</Text>
                <Text style={styles.securityLabel}>Push opt-in</Text>
              </View>
              <View style={styles.securityTile}>
                <Text style={styles.securityValue}>{Math.round(snapshot.mobileSecurity.crashFreeSessions * 100)}%</Text>
                <Text style={styles.securityLabel}>Crash-free</Text>
              </View>
            </View>
            <Text style={styles.securityComment}>{snapshot.mobileSecurity.comment}</Text>
            <Text style={styles.securityMeta}>
              Last audit {new Date(snapshot.mobileSecurity.lastAudit).toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      {isFetching && <ActivityIndicator style={styles.loadingIndicator} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18,
    backgroundColor: '#f7f8fb'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#102a43'
  },
  subtitle: {
    fontSize: 15,
    color: '#596177',
    marginBottom: 8
  },
  filters: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#0f1a2b',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2
  },
  filterLabel: {
    fontWeight: '600',
    color: '#1b2233'
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#eef1f8'
  },
  filterButtonActive: {
    backgroundColor: '#1a73e8'
  },
  filterText: {
    color: '#475066',
    fontWeight: '600'
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700'
  },
  section: {
    gap: 16
  },
  snapshotMeta: {
    gap: 4
  },
  snapshotTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1b2233'
  },
  snapshotMetaText: {
    color: '#596177',
    fontSize: 13
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  kpiCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#0f1a2b',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2
  },
  kpiLabel: {
    fontSize: 14,
    color: '#475066',
    marginBottom: 4
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700'
  },
  kpiDelta: {
    fontSize: 13,
    color: '#596177'
  },
  kpiStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#475066'
  },
  highlights: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    gap: 6
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b2233',
    marginBottom: 6
  },
  highlightText: {
    color: '#475066',
    fontSize: 14
  },
  alertSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    gap: 10
  },
  alertCard: {
    backgroundColor: '#f6f8fc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8
  },
  alertTitle: {
    fontWeight: '700',
    marginBottom: 4,
    color: '#1b2233'
  },
  alertDescription: {
    color: '#475066',
    marginBottom: 4
  },
  alertImpact: {
    color: '#596177',
    fontSize: 13,
    marginBottom: 2
  },
  alertOwner: {
    color: '#475066',
    fontSize: 12
  },
  alertBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  alertBadgeText: {
    color: '#1b2233',
    fontSize: 12,
    fontWeight: '600'
  },
  scheduleSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    gap: 10
  },
  scheduleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f8fc',
    borderRadius: 12,
    padding: 12
  },
  scheduleName: {
    fontWeight: '700',
    color: '#1b2233'
  },
  scheduleMeta: {
    color: '#596177',
    fontSize: 13
  },
  scheduleEnabled: {
    color: '#0f9d58',
    fontWeight: '700'
  },
  schedulePaused: {
    color: '#d93025',
    fontWeight: '700'
  },
  mobileSecurity: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    gap: 8
  },
  securityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  securityTile: {
    backgroundColor: '#e8f0fe',
    padding: 12,
    borderRadius: 12,
    minWidth: 110,
    alignItems: 'center'
  },
  securityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b2233'
  },
  securityLabel: {
    fontSize: 12,
    color: '#475066'
  },
  securityComment: {
    color: '#475066',
    fontSize: 14
  },
  securityMeta: {
    color: '#596177',
    fontSize: 12
  },
  muted: {
    color: '#596177'
  },
  loadingIndicator: {
    marginTop: 12
  }
});
