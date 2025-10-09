import {
  AnalyticsAlert,
  AnalyticsAssistantRecommendation,
  AnalyticsAssistantResponse,
  AnalyticsKpi,
  AnalyticsReportSchedule,
  AnalyticsSegment,
  AnalyticsSnapshot,
  AnalyticsTimeframe
} from '../../services/intranetApi';

function formatSegment(segment: AnalyticsSegment) {
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

function formatTimeframe(timeframe: AnalyticsTimeframe) {
  if (timeframe === '7d') {
    return '7-day';
  }
  if (timeframe === '30d') {
    return '30-day';
  }
  return '90-day';
}

function formatValue(kpi: AnalyticsKpi) {
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

function formatDelta(kpi: AnalyticsKpi) {
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

function selectFocusKpi(question: string, kpis: AnalyticsKpi[]): AnalyticsKpi {
  const normalized = question.toLowerCase();
  const match = kpis.find((kpi) => normalized.includes(kpi.label.split(' ')[0].toLowerCase()));
  if (match) {
    return match;
  }
  const sorted = [...kpis].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return sorted[0];
}

function selectRelevantAlerts(question: string, alerts: AnalyticsAlert[]): AnalyticsAlert[] {
  const normalized = question.toLowerCase();
  if (!alerts.length) {
    return [];
  }
  const direct = alerts.filter((alert) => normalized.includes(alert.title.toLowerCase().split(' ')[0]));
  if (direct.length) {
    return direct;
  }
  const highSeverity = alerts.filter((alert) => alert.severity === 'high' || alert.severity === 'critical');
  return highSeverity.length ? highSeverity : [alerts[0]];
}

function selectSchedule(question: string, schedules: AnalyticsReportSchedule[]): AnalyticsReportSchedule | undefined {
  if (!schedules.length) {
    return undefined;
  }
  const normalized = question.toLowerCase();
  if (normalized.includes('schedule') || normalized.includes('report') || normalized.includes('email')) {
    return schedules[0];
  }
  return undefined;
}

function buildRecommendations(
  focusKpi: AnalyticsKpi,
  alerts: AnalyticsAlert[],
  schedule?: AnalyticsReportSchedule
): AnalyticsAssistantRecommendation[] {
  const recommendations: AnalyticsAssistantRecommendation[] = [];

  alerts.forEach((alert) => {
    recommendations.push({
      id: `${alert.id}-action`,
      statement: alert.recommendedAction,
      impact: alert.severity === 'critical' || alert.severity === 'high' ? 'high' : 'medium',
      owner: alert.owner
    });
  });

  if (focusKpi.status === 'watch' || focusKpi.status === 'at-risk') {
    recommendations.push({
      id: `${focusKpi.id}-stabilise`,
      statement: `Stabilise ${focusKpi.label.toLowerCase()} by coordinating with ${focusKpi.owner} on targeted interventions.`,
      impact: focusKpi.status === 'at-risk' ? 'high' : 'medium',
      owner: focusKpi.owner
    });
  }

  if (schedule) {
    recommendations.push({
      id: `${schedule.id}-schedule`,
      statement: `Confirm recipients for ${schedule.name.toLowerCase()} (${schedule.deliveryFormat}) to broadcast the latest metrics.`,
      impact: 'medium',
      owner: schedule.owner
    });
  }

  return recommendations;
}

function calculateConfidence(snapshot: AnalyticsSnapshot, alerts: AnalyticsAlert[]): number {
  const base = snapshot.dataQuality.completeness;
  const penalty = alerts.some((alert) => alert.severity === 'critical')
    ? 0.2
    : alerts.some((alert) => alert.severity === 'high')
      ? 0.1
      : 0.05 * alerts.length;
  const confidence = Math.max(0.5, Math.min(0.95, base - penalty));
  return Number(confidence.toFixed(2));
}

export function generateAssistantResponse(
  question: string,
  snapshot: AnalyticsSnapshot
): AnalyticsAssistantResponse {
  const focusKpi = selectFocusKpi(question, snapshot.kpis);
  const relevantAlerts = selectRelevantAlerts(question, snapshot.alerts);
  const schedule = selectSchedule(question, snapshot.schedules);

  const segmentLabel = formatSegment(snapshot.segment);
  const timeframeLabel = formatTimeframe(snapshot.timeframe);

  const summaryParts = [
    `${snapshot.dataset.name} for ${segmentLabel} over the ${timeframeLabel} window is ${
      focusKpi.delta >= 0 ? 'up' : 'down'
    } ${formatDelta(focusKpi)} to ${formatValue(focusKpi)}.`,
    focusKpi.narrative
  ];

  if (relevantAlerts.length) {
    summaryParts.push(
      `${relevantAlerts[0].title} remains ${relevantAlerts[0].severity.toUpperCase()} priority — ${relevantAlerts[0].impact}`
    );
  }

  const references: AnalyticsAssistantResponse['references'] = [
    { type: 'kpi', id: focusKpi.id }
  ];

  relevantAlerts.forEach((alert) => {
    references.push({ type: 'alert', id: alert.id });
  });

  if (schedule) {
    references.push({ type: 'schedule', id: schedule.id });
  }

  const highlights = snapshot.aiInsights.slice(0, 3);
  const recommendations = buildRecommendations(focusKpi, relevantAlerts, schedule);
  const confidence = calculateConfidence(snapshot, relevantAlerts);

  return {
    summary: summaryParts.join(' '),
    highlights,
    recommendations,
    confidence,
    references
  };
}
