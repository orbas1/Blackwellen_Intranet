import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import {
  AnalyticsAlert,
  AnalyticsAssistantResponse,
  AnalyticsDatasetKey,
  AnalyticsQueryParams,
  AnalyticsReportSchedule,
  AnalyticsSegment,
  AnalyticsSnapshot,
  AnalyticsTimeframe,
  acknowledgeAnalyticsAlert,
  fetchAnalyticsSnapshot,
  updateAnalyticsReportSchedule
} from '../../services/intranetApi';
import { trackEvent } from '../../services/telemetry';
import { generateAssistantResponse } from './assistant';
import styles from './analyticsConsole.module.css';

type AssistantMessage =
  | { id: string; role: 'user'; content: string; timestamp: string }
  | { id: string; role: 'assistant'; response: AnalyticsAssistantResponse; timestamp: string };

const DATASET_OPTIONS: { key: AnalyticsDatasetKey; name: string }[] = [
  { key: 'engagement', name: 'Employee Engagement' },
  { key: 'service', name: 'Service Operations Health' },
  { key: 'finance', name: 'Finance & Investment Performance' }
];

const SEGMENT_OPTIONS: AnalyticsSegment[] = ['global', 'emea', 'apac', 'amer'];
const TIMEFRAME_OPTIONS: AnalyticsTimeframe[] = ['7d', '30d', '90d'];

const DEFAULT_PARAMS: AnalyticsQueryParams = {
  dataset: 'engagement',
  timeframe: '30d',
  segment: 'global'
};

function formatSegmentLabel(segment: AnalyticsSegment) {
  switch (segment) {
    case 'emea':
      return 'EMEA';
    case 'apac':
      return 'APAC';
    case 'amer':
      return 'Americas';
    default:
      return 'Global';
  }
}

function formatTimeframeLabel(timeframe: AnalyticsTimeframe) {
  if (timeframe === '7d') {
    return '7-day';
  }
  if (timeframe === '30d') {
    return '30-day';
  }
  return '90-day';
}

function formatKpiValue(snapshot: AnalyticsSnapshot, id: string) {
  const kpi = snapshot.kpis.find((item) => item.id === id);
  if (!kpi) {
    return '';
  }
  switch (kpi.unit) {
    case 'percentage':
      return `${(kpi.value * 100).toFixed(Math.min(kpi.precision + 1, 2))}%`;
    case 'currency':
      if (kpi.value >= 1_000_000) {
        return `$${(kpi.value / 1_000_000).toFixed(1)}M`;
      }
      return `$${(kpi.value / 1_000).toFixed(0)}K`;
    case 'duration':
      return `${kpi.value.toFixed(1)} hrs`;
    default:
      return kpi.value.toLocaleString();
  }
}

function formatKpiDelta(kpi: AnalyticsSnapshot['kpis'][number]) {
  const sign = kpi.delta > 0 ? '+' : '';
  switch (kpi.unit) {
    case 'percentage':
      return `${sign}${(kpi.delta * 100).toFixed(Math.min(kpi.precision + 1, 2))}pp`;
    case 'currency':
      if (Math.abs(kpi.delta) >= 1_000_000) {
        return `${sign}$${(Math.abs(kpi.delta) / 1_000_000).toFixed(1)}M`;
      }
      return `${sign}$${(Math.abs(kpi.delta) / 1_000).toFixed(0)}K`;
    case 'duration':
      return `${sign}${Math.abs(kpi.delta).toFixed(1)} hrs`;
    default:
      return `${sign}${Math.round(Math.abs(kpi.delta)).toLocaleString()}`;
  }
}

function getStatusLabel(status: AnalyticsSnapshot['kpis'][number]['status']) {
  switch (status) {
    case 'exceeding':
      return 'Exceeding target';
    case 'on-track':
      return 'On track';
    case 'watch':
      return 'Watch list';
    case 'at-risk':
      return 'At risk';
    default:
      return status;
  }
}

function selectChartKpi(snapshot: AnalyticsSnapshot) {
  const sorted = [...snapshot.kpis].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return sorted[0];
}

function buildTrendPoints(kpi: AnalyticsSnapshot['kpis'][number]) {
  const values = kpi.trend.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return kpi.trend.map((point, index) => {
    const x = (index / Math.max(kpi.trend.length - 1, 1)) * 100;
    const y = 100 - ((point.value - min) / range) * 100;
    return `${x},${y}`;
  });
}

function buildAssistantSeed(snapshot: AnalyticsSnapshot): AnalyticsAssistantResponse {
  const topAlert = snapshot.alerts[0];
  const references: AnalyticsAssistantResponse['references'] = [
    { type: 'kpi', id: snapshot.kpis[0]?.id ?? 'primary-kpi' }
  ];

  if (topAlert) {
    references.push({ type: 'alert', id: topAlert.id });
  }

  return {
    summary: `${snapshot.dataset.name} ${formatSegmentLabel(snapshot.segment)} view refreshed ${formatTimeframeLabel(snapshot.timeframe)} with ${snapshot.kpis.length} KPIs ready.`,
    highlights: snapshot.aiInsights.slice(0, 3),
    recommendations: topAlert
      ? [
          {
            id: `${topAlert.id}-seed`,
            statement: topAlert.recommendedAction,
            impact: topAlert.severity === 'critical' || topAlert.severity === 'high' ? 'high' : 'medium',
            owner: topAlert.owner
          }
        ]
      : [],
    confidence: Number(Math.max(0.6, Math.min(0.95, snapshot.dataQuality.completeness)).toFixed(2)),
    references
  };
}

type AnalyticsSnapshotResponse = Awaited<ReturnType<typeof fetchAnalyticsSnapshot>>;
type AnalyticsAlertAckResponse = Awaited<ReturnType<typeof acknowledgeAnalyticsAlert>>;
type AnalyticsScheduleResponse = Awaited<ReturnType<typeof updateAnalyticsReportSchedule>>;

export function AnalyticsConsole() {
  const [params, setParams] = useState<AnalyticsQueryParams>(DEFAULT_PARAMS);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<AssistantMessage[]>([]);
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => ['analytics', params] as const, [params]);

  const { data, isFetching } = useQuery<AnalyticsSnapshotResponse>({
    queryKey,
    queryFn: () => fetchAnalyticsSnapshot(params),
    placeholderData: keepPreviousData
  });

  const snapshot = data?.data;

  useEffect(() => {
    if (!snapshot) {
      return;
    }
    trackEvent('analytics.snapshot_loaded', {
      dataset: snapshot.dataset.key,
      segment: snapshot.segment,
      timeframe: snapshot.timeframe,
      alerts: snapshot.alerts.length,
      schedules: snapshot.schedules.length
    });
    setConversation([
      {
        id: `${snapshot.dataset.key}-${snapshot.segment}-${snapshot.timeframe}-seed`,
        role: 'assistant',
        response: buildAssistantSeed(snapshot),
        timestamp: new Date().toISOString()
      }
    ]);
  }, [snapshot?.dataset.key, snapshot?.segment, snapshot?.timeframe]);

  const assistantMutation = useMutation<AnalyticsAssistantResponse, Error, string>({
    mutationFn: async (prompt: string) => {
      if (!snapshot) {
        throw new Error('Snapshot unavailable');
      }
      trackEvent('analytics.assistant_question', {
        dataset: snapshot.dataset.key,
        segment: snapshot.segment,
        timeframe: snapshot.timeframe
      });
      return generateAssistantResponse(prompt, snapshot);
    },
    onSuccess: (response, prompt) => {
      setConversation((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: 'user', content: prompt, timestamp: new Date().toISOString() },
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          response,
          timestamp: new Date().toISOString()
        }
      ]);
      setQuestion('');
    }
  });

  const acknowledgeMutation = useMutation<
    AnalyticsAlertAckResponse,
    Error,
    string
  >({
    mutationFn: (alertId: string) => acknowledgeAnalyticsAlert(alertId),
    onSuccess: ({ data: acknowledgement }, alertId) => {
      queryClient.setQueryData<AnalyticsSnapshotResponse>(queryKey, (current) => {
        if (!current?.data) {
          return current;
        }
        return {
          ...current,
          data: {
            ...current.data,
            alerts: current.data.alerts.map((alert) =>
              alert.id === alertId
                ? { ...alert, status: 'acknowledged', acknowledgedAt: acknowledgement.acknowledgedAt }
                : alert
            )
          }
        };
      });
      trackEvent('analytics.alert_acknowledged', {
        alertId,
        dataset: params.dataset,
        segment: params.segment
      });
    }
  });

  const scheduleMutation = useMutation<
    AnalyticsScheduleResponse,
    Error,
    { scheduleId: string; enabled: boolean }
  >({
    mutationFn: ({ scheduleId, enabled }: { scheduleId: string; enabled: boolean }) =>
      updateAnalyticsReportSchedule({ scheduleId, enabled }),
    onSuccess: ({ data: schedule }) => {
      queryClient.setQueryData<AnalyticsSnapshotResponse>(queryKey, (current) => {
        if (!current?.data) {
          return current;
        }
        return {
          ...current,
          data: {
            ...current.data,
            schedules: current.data.schedules.map((existing) =>
              existing.id === schedule.id ? schedule : existing
            )
          }
        };
      });
      trackEvent('analytics.schedule_updated', {
        scheduleId: schedule.id,
        enabled: schedule.enabled,
        dataset: params.dataset
      });
    }
  });

  const datasets = snapshot?.availableDatasets ?? DATASET_OPTIONS;
  const segments = snapshot?.availableSegments ?? SEGMENT_OPTIONS;
  const timeframes = snapshot?.availableTimeframes ?? TIMEFRAME_OPTIONS;
  const trendKpi = snapshot ? selectChartKpi(snapshot) : undefined;
  const trendPoints = trendKpi ? buildTrendPoints(trendKpi) : [];

  const alertsByStatus = useMemo(() => {
    if (!snapshot) {
      return [];
    }
    return [...snapshot.alerts].sort(
      (a, b) => (a.status === 'active' ? -1 : 1) - (b.status === 'active' ? -1 : 1)
    );
  }, [snapshot]);

  const handleParamChange = (next: Partial<AnalyticsQueryParams>) => {
    setParams((prev) => {
      const updated = { ...prev, ...next };
      trackEvent('analytics.view_changed', updated);
      return updated;
    });
  };

  const handleAssistantSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim() || !snapshot) {
      return;
    }
    assistantMutation.mutate(question.trim());
  };

  const handleAcknowledge = (alert: AnalyticsAlert) => {
    if (alert.status === 'acknowledged') {
      return;
    }
    acknowledgeMutation.mutate(alert.id);
  };

  const handleScheduleToggle = (schedule: AnalyticsReportSchedule) => {
    scheduleMutation.mutate({ scheduleId: schedule.id, enabled: !schedule.enabled });
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <h1>Analytics Control Tower</h1>
          <p>
            Monitor KPI performance, act on high-severity alerts, and orchestrate reporting for{' '}
            {snapshot ? snapshot.dataset.name.toLowerCase() : 'core'} domains.
          </p>
        </div>
        {snapshot && (
          <div className={styles.refreshMeta}>
            <span>
              Last refreshed {formatDistanceToNow(new Date(snapshot.lastRefreshed), { addSuffix: true })}
            </span>
            <span>
              Data source: {snapshot.dataSource === 'stream' ? 'Realtime stream' : 'Data warehouse'} · Lag {snapshot.freshnessLagMinutes}
              m
            </span>
          </div>
        )}
      </header>

      <div className={styles.controls}>
        <label>
          Dataset
          <select
            value={params.dataset}
            onChange={(event) => handleParamChange({ dataset: event.target.value as AnalyticsDatasetKey })}
          >
            {datasets.map((dataset) => (
              <option key={dataset.key} value={dataset.key}>
                {dataset.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Timeframe
          <select
            value={params.timeframe}
            onChange={(event) => handleParamChange({ timeframe: event.target.value as AnalyticsTimeframe })}
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe} value={timeframe}>
                {formatTimeframeLabel(timeframe)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Segment
          <select
            value={params.segment}
            onChange={(event) => handleParamChange({ segment: event.target.value as AnalyticsSegment })}
          >
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {formatSegmentLabel(segment)}
              </option>
            ))}
          </select>
        </label>
        {snapshot && (
          <div className={styles.dataQuality}>
            <strong>Data quality</strong>
            <span>{(snapshot.dataQuality.completeness * 100).toFixed(1)}% coverage</span>
            <span>{snapshot.dataQuality.anomalyCount} anomalies flagged</span>
            <span>{snapshot.dataQuality.coverageNotes}</span>
          </div>
        )}
      </div>

      {snapshot && (
        <div className={styles.metricsGrid}>
          {snapshot.kpis.map((kpi) => (
            <article key={kpi.id} className={styles.metricCard} data-status={kpi.status}>
              <header>
                <h3>{kpi.label}</h3>
                <span className={styles.status}>{getStatusLabel(kpi.status)}</span>
              </header>
              <p className={styles.metricValue}>{formatKpiValue(snapshot, kpi.id)}</p>
              <p className={styles.metricDelta} data-direction={kpi.delta >= 0 ? 'positive' : 'negative'}>
                {formatKpiDelta(kpi)} {kpi.comparisonPeriod}
              </p>
              <footer>
                <span>Owner: {kpi.owner}</span>
                {kpi.target ? <span>Target: {formatKpiValue(snapshot, kpi.id)}</span> : null}
              </footer>
            </article>
          ))}
        </div>
      )}

      {trendKpi && (
        <div className={styles.trendPanel}>
          <header>
            <h2>{trendKpi.label} trend</h2>
            <p>
              {formatSegmentLabel(params.segment)} {formatTimeframeLabel(params.timeframe)} ·{' '}
              {trendKpi.narrative}
            </p>
          </header>
          <svg className={styles.trendChart} viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points={trendPoints.join(' ')} />
          </svg>
        </div>
      )}

      {snapshot && (
        <div className={styles.storyHighlights}>
          <h2>Story highlights</h2>
          <ul>
            {snapshot.storyHighlights.map((highlight) => (
              <li key={highlight.id}>
                <strong>{highlight.title}</strong>
                <span>{highlight.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.workspace}>
        <section className={styles.assistant}>
          <header>
            <h2>AI assistant</h2>
            <p>Ask about KPI performance, alert prioritisation, or reporting commitments.</p>
          </header>
          <div className={styles.conversation}>
            {conversation.map((message) =>
              message.role === 'assistant' ? (
                <article key={message.id} className={styles.assistantMessage}>
                  <p className={styles.assistantSummary}>{message.response.summary}</p>
                  <ul>
                    {message.response.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                  <div className={styles.recommendations}>
                    <h3>Recommended actions</h3>
                    <ul>
                      {message.response.recommendations.map((recommendation) => (
                        <li key={recommendation.id}>
                          <strong>{recommendation.impact.toUpperCase()}</strong> · {recommendation.statement} — {recommendation.owner}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <footer>Confidence {Math.round(message.response.confidence * 100)}%</footer>
                </article>
              ) : (
                <article key={message.id} className={styles.userMessage}>
                  <p>{message.content}</p>
                </article>
              )
            )}
          </div>
          <form className={styles.assistantForm} onSubmit={handleAssistantSubmit}>
            <label htmlFor="assistant-question">Ask a question</label>
            <textarea
              id="assistant-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="e.g. Where should we intervene first for service operations?"
            />
            <div className={styles.assistantActions}>
              <button type="submit" disabled={!question.trim() || assistantMutation.isPending}>
                {assistantMutation.isPending ? 'Analysing…' : 'Get guidance'}
              </button>
            </div>
          </form>
        </section>

        <section className={styles.alerts}>
          <header>
            <h2>Live alerts</h2>
            <p>Track active issues and acknowledge when mitigation is underway.</p>
          </header>
          <ul>
            {alertsByStatus?.map((alert) => (
              <li key={alert.id} data-severity={alert.severity} data-status={alert.status}>
                <div>
                  <h3>{alert.title}</h3>
                  <p>{alert.description}</p>
                  <p className={styles.alertImpact}>{alert.impact}</p>
                  <span>Owner: {alert.owner}</span>
                </div>
                <div className={styles.alertActions}>
                  <button type="button" onClick={() => handleAcknowledge(alert)} disabled={alert.status === 'acknowledged'}>
                    {alert.status === 'acknowledged' ? 'Acknowledged' : 'Acknowledge'}
                  </button>
                  <span>SLA {alert.slaHours}h</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.schedules}>
          <header>
            <h2>Report schedules</h2>
            <p>Enable or pause scheduled digests and adjust delivery as teams evolve.</p>
          </header>
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Cadence</th>
                <th scope="col">Channel</th>
                <th scope="col">Recipients</th>
                <th scope="col">Next run</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {snapshot?.schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.name}</td>
                  <td>{schedule.cadence}</td>
                  <td>{schedule.deliveryFormat}</td>
                  <td>{schedule.recipients.join(', ')}</td>
                  <td>{formatDistanceToNow(new Date(schedule.nextRunAt), { addSuffix: true })}</td>
                  <td>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={() => handleScheduleToggle(schedule)}
                      />
                      <span>{schedule.enabled ? 'Enabled' : 'Paused'}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {snapshot && (
        <div className={styles.securityRow}>
          <section className={styles.securityControls}>
            <h2>Security controls</h2>
            <ul>
              {snapshot.securityControls.map((control) => (
                <li key={control.id} data-status={control.status}>
                  <div>
                    <h3>{control.name}</h3>
                    <p>{control.description}</p>
                  </div>
                  <footer>
                    <span>Owner: {control.owner}</span>
                    <span>Last reviewed {formatDistanceToNow(new Date(control.lastReviewed), { addSuffix: true })}</span>
                    <span>{Math.round(control.coverage * 100)}% coverage</span>
                  </footer>
                  <ul className={styles.controlActions}>
                    {control.requiredActions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.mobileSecurity}>
            <h2>Mobile security posture</h2>
            <div className={styles.mobileStats}>
              <div>
                <strong>{snapshot.mobileSecurity.compliantDevices}</strong>
                <span>Compliant devices</span>
              </div>
              <div>
                <strong>{snapshot.mobileSecurity.pendingRemediations}</strong>
                <span>Pending remediations</span>
              </div>
              <div>
                <strong>{Math.round(snapshot.mobileSecurity.pushOptInRate * 100)}%</strong>
                <span>Push opt-in</span>
              </div>
              <div>
                <strong>{Math.round(snapshot.mobileSecurity.crashFreeSessions * 100)}%</strong>
                <span>Crash-free sessions</span>
              </div>
            </div>
            <p>{snapshot.mobileSecurity.comment}</p>
            <footer>
              Last audit {formatDistanceToNow(new Date(snapshot.mobileSecurity.lastAudit), { addSuffix: true })}
            </footer>
          </section>
        </div>
      )}

      {isFetching && <div className={styles.loading}>Refreshing analytics data…</div>}
    </section>
  );
}
