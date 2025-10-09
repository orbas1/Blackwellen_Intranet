import { formatISO, subDays, subMinutes } from 'date-fns';

import type {
  AnalyticsAlert,
  AnalyticsDataset,
  AnalyticsKpi,
  AnalyticsQueryParams,
  AnalyticsReportSchedule,
  AnalyticsSecurityControl,
  AnalyticsSnapshot,
  AnalyticsTrendPoint,
  MobileSecurityPosture
} from './intranetApi';

type MetricTimeframe = AnalyticsQueryParams['timeframe'];
type MetricSegment = AnalyticsQueryParams['segment'];

type MetricValueConfig = {
  value: number;
  delta: number;
  comparison: string;
  status: AnalyticsKpi['status'];
};

type AnalyticsMetricDefinition = {
  id: string;
  label: string;
  dataset: AnalyticsDataset['key'];
  unit: AnalyticsKpi['unit'];
  direction: 'higher' | 'lower';
  precision: number;
  target?: number;
  owner: string;
  narrative: string;
  segments: Record<MetricSegment, Record<MetricTimeframe, MetricValueConfig>>;
};

const now = new Date();

const analyticsDatasets: AnalyticsDataset[] = [
  {
    key: 'engagement',
    name: 'Employee Engagement',
    description: 'Pulse participation, sentiment and attrition predictors across the workforce.'
  },
  {
    key: 'service',
    name: 'Service Operations Health',
    description: 'SLA compliance, cycle times and automation performance for cross-functional workflows.'
  },
  {
    key: 'finance',
    name: 'Finance & Investment Performance',
    description: 'Spend variance, treasury yield and compliance coverage across finance operations.'
  }
];

const analyticsMetricDefinitions: AnalyticsMetricDefinition[] = [
  {
    id: 'engagement-response-rate',
    label: 'Pulse survey response rate',
    dataset: 'engagement',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.78,
    owner: 'Maya Alvarez',
    narrative: 'Tracks the proportion of employees completing monthly pulse surveys to monitor listening health.',
    segments: {
      global: {
        '7d': { value: 0.74, delta: 0.02, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.71, delta: 0.05, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.69, delta: 0.06, comparison: 'vs prior quarter', status: 'watch' }
      },
      emea: {
        '7d': { value: 0.8, delta: 0.01, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.79, delta: 0.03, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 0.77, delta: 0.04, comparison: 'vs prior quarter', status: 'on-track' }
      },
      apac: {
        '7d': { value: 0.76, delta: 0.04, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.72, delta: 0.07, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.68, delta: 0.05, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 0.7, delta: -0.01, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 0.69, delta: 0.01, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 0.67, delta: 0.02, comparison: 'vs prior quarter', status: 'at-risk' }
      }
    }
  },
  {
    id: 'engagement-sentiment',
    label: 'Favourability index',
    dataset: 'engagement',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.85,
    owner: 'Danielle Rivers',
    narrative: 'Weighted sentiment score across engagement, wellbeing and leadership signals.',
    segments: {
      global: {
        '7d': { value: 0.82, delta: 0.01, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.81, delta: 0.02, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.79, delta: 0.03, comparison: 'vs prior quarter', status: 'watch' }
      },
      emea: {
        '7d': { value: 0.86, delta: 0.02, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.84, delta: 0.03, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 0.82, delta: 0.04, comparison: 'vs prior quarter', status: 'watch' }
      },
      apac: {
        '7d': { value: 0.85, delta: 0.03, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.83, delta: 0.04, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.8, delta: 0.05, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 0.8, delta: -0.01, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 0.79, delta: 0, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 0.77, delta: 0.01, comparison: 'vs prior quarter', status: 'at-risk' }
      }
    }
  },
  {
    id: 'engagement-attrition-risk',
    label: 'Projected voluntary attrition',
    dataset: 'engagement',
    unit: 'percentage',
    direction: 'lower',
    precision: 3,
    target: 0.07,
    owner: 'Leo Ng',
    narrative: 'Predictive attrition risk derived from sentiment, tenure and mobility signals.',
    segments: {
      global: {
        '7d': { value: 0.068, delta: -0.004, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.072, delta: -0.006, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 0.078, delta: -0.01, comparison: 'vs prior quarter', status: 'watch' }
      },
      emea: {
        '7d': { value: 0.062, delta: -0.005, comparison: 'vs prior 7 days', status: 'exceeding' },
        '30d': { value: 0.064, delta: -0.008, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 0.069, delta: -0.009, comparison: 'vs prior quarter', status: 'on-track' }
      },
      apac: {
        '7d': { value: 0.075, delta: -0.003, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.079, delta: -0.002, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.083, delta: -0.001, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 0.081, delta: 0.002, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 0.085, delta: 0.004, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 0.089, delta: 0.006, comparison: 'vs prior quarter', status: 'at-risk' }
      }
    }
  },
  {
    id: 'service-sla-compliance',
    label: 'SLA compliance rate',
    dataset: 'service',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.95,
    owner: 'Ravi Patel',
    narrative: 'Share of service hub tickets closed within negotiated SLAs by segment and timeframe.',
    segments: {
      global: {
        '7d': { value: 0.91, delta: -0.02, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.93, delta: -0.01, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.95, delta: 0, comparison: 'vs prior quarter', status: 'on-track' }
      },
      emea: {
        '7d': { value: 0.95, delta: 0, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.96, delta: 0.01, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 0.97, delta: 0.01, comparison: 'vs prior quarter', status: 'exceeding' }
      },
      apac: {
        '7d': { value: 0.89, delta: -0.03, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 0.9, delta: -0.02, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 0.92, delta: -0.01, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 0.93, delta: -0.01, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.94, delta: 0, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.95, delta: 0.01, comparison: 'vs prior quarter', status: 'on-track' }
      }
    }
  },
  {
    id: 'service-first-response',
    label: 'First response time (hrs)',
    dataset: 'service',
    unit: 'duration',
    direction: 'lower',
    precision: 2,
    target: 3.5,
    owner: 'Sonia Price',
    narrative: 'Average hours to first response on service hub tickets with automation and staffing overlays.',
    segments: {
      global: {
        '7d': { value: 4.1, delta: 0.4, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 3.8, delta: 0.2, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 3.6, delta: -0.1, comparison: 'vs prior quarter', status: 'on-track' }
      },
      emea: {
        '7d': { value: 3.4, delta: -0.2, comparison: 'vs prior 7 days', status: 'exceeding' },
        '30d': { value: 3.3, delta: -0.3, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 3.2, delta: -0.4, comparison: 'vs prior quarter', status: 'exceeding' }
      },
      apac: {
        '7d': { value: 4.6, delta: 0.5, comparison: 'vs prior 7 days', status: 'at-risk' },
        '30d': { value: 4.2, delta: 0.3, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 4, delta: 0.1, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 3.9, delta: 0.3, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 3.7, delta: 0.1, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 3.5, delta: -0.05, comparison: 'vs prior quarter', status: 'on-track' }
      }
    }
  },
  {
    id: 'service-automation-coverage',
    label: 'Automation coverage',
    dataset: 'service',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.62,
    owner: 'Ravi Patel',
    narrative: 'Share of workflows executed with automation templates or bots across service hub journeys.',
    segments: {
      global: {
        '7d': { value: 0.58, delta: 0.01, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.6, delta: 0.04, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 0.63, delta: 0.07, comparison: 'vs prior quarter', status: 'exceeding' }
      },
      emea: {
        '7d': { value: 0.62, delta: 0.03, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.64, delta: 0.05, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 0.67, delta: 0.08, comparison: 'vs prior quarter', status: 'exceeding' }
      },
      apac: {
        '7d': { value: 0.55, delta: 0.02, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.57, delta: 0.03, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.6, delta: 0.05, comparison: 'vs prior quarter', status: 'on-track' }
      },
      amer: {
        '7d': { value: 0.59, delta: 0.02, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.61, delta: 0.03, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 0.63, delta: 0.05, comparison: 'vs prior quarter', status: 'exceeding' }
      }
    }
  },
  {
    id: 'finance-spend-variance',
    label: 'Spend variance (USD)',
    dataset: 'finance',
    unit: 'currency',
    direction: 'lower',
    precision: 0,
    target: 200000,
    owner: 'Elena Novak',
    narrative: 'Variance between actual spend and budget across finance cost centres.',
    segments: {
      global: {
        '7d': { value: 180000, delta: -20000, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 250000, delta: 50000, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 320000, delta: 70000, comparison: 'vs prior quarter', status: 'at-risk' }
      },
      emea: {
        '7d': { value: 140000, delta: -15000, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 200000, delta: -10000, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 260000, delta: 20000, comparison: 'vs prior quarter', status: 'watch' }
      },
      apac: {
        '7d': { value: 210000, delta: -10000, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 270000, delta: 20000, comparison: 'vs prior 30 days', status: 'at-risk' },
        '90d': { value: 340000, delta: 50000, comparison: 'vs prior quarter', status: 'at-risk' }
      },
      amer: {
        '7d': { value: 190000, delta: -5000, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 260000, delta: 30000, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 310000, delta: 40000, comparison: 'vs prior quarter', status: 'at-risk' }
      }
    }
  },
  {
    id: 'finance-investment-yield',
    label: 'Investment yield',
    dataset: 'finance',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.045,
    owner: 'Priya Desai',
    narrative: 'Net yield on short-term investments and treasury holdings.',
    segments: {
      global: {
        '7d': { value: 0.046, delta: 0.003, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.044, delta: 0.002, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.042, delta: 0.001, comparison: 'vs prior quarter', status: 'watch' }
      },
      emea: {
        '7d': { value: 0.048, delta: 0.004, comparison: 'vs prior 7 days', status: 'exceeding' },
        '30d': { value: 0.046, delta: 0.003, comparison: 'vs prior 30 days', status: 'on-track' },
        '90d': { value: 0.044, delta: 0.002, comparison: 'vs prior quarter', status: 'watch' }
      },
      apac: {
        '7d': { value: 0.043, delta: 0.002, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.041, delta: 0.001, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.039, delta: 0, comparison: 'vs prior quarter', status: 'at-risk' }
      },
      amer: {
        '7d': { value: 0.045, delta: 0.002, comparison: 'vs prior 7 days', status: 'on-track' },
        '30d': { value: 0.043, delta: 0.001, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.041, delta: 0, comparison: 'vs prior quarter', status: 'watch' }
      }
    }
  },
  {
    id: 'finance-compliance-complete',
    label: 'Finance control attestations',
    dataset: 'finance',
    unit: 'percentage',
    direction: 'higher',
    precision: 3,
    target: 0.98,
    owner: 'Hiro Tanaka',
    narrative: 'Completion rate for quarterly finance control attestations and reconciliations.',
    segments: {
      global: {
        '7d': { value: 0.96, delta: 0.01, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.965, delta: 0.015, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.972, delta: 0.02, comparison: 'vs prior quarter', status: 'on-track' }
      },
      emea: {
        '7d': { value: 0.985, delta: 0.005, comparison: 'vs prior 7 days', status: 'exceeding' },
        '30d': { value: 0.988, delta: 0.008, comparison: 'vs prior 30 days', status: 'exceeding' },
        '90d': { value: 0.99, delta: 0.01, comparison: 'vs prior quarter', status: 'exceeding' }
      },
      apac: {
        '7d': { value: 0.95, delta: 0.012, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.955, delta: 0.014, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.962, delta: 0.016, comparison: 'vs prior quarter', status: 'watch' }
      },
      amer: {
        '7d': { value: 0.953, delta: 0.009, comparison: 'vs prior 7 days', status: 'watch' },
        '30d': { value: 0.958, delta: 0.012, comparison: 'vs prior 30 days', status: 'watch' },
        '90d': { value: 0.968, delta: 0.015, comparison: 'vs prior quarter', status: 'on-track' }
      }
    }
  }
];

const analyticsReportSchedules: AnalyticsReportSchedule[] = [
  {
    id: 'sched-executive-weekly',
    name: 'Executive KPI digest',
    cadence: 'weekly',
    deliveryFormat: 'email',
    recipients: ['executive.office@blackwellen.com'],
    filters: { dataset: 'engagement', timeframe: '7d', segment: 'global' },
    lastRunAt: formatISO(subMinutes(now, 90)),
    nextRunAt: formatISO(addShift(now, { hours: 18 })),
    lastRunStatus: 'on_time',
    enabled: true,
    owner: 'Danielle Rivers'
  },
  {
    id: 'sched-ops-daily',
    name: 'Operations health stand-up',
    cadence: 'daily',
    deliveryFormat: 'slack',
    recipients: ['#service-operations'],
    filters: { dataset: 'service', timeframe: '7d', segment: 'apac' },
    lastRunAt: formatISO(subMinutes(now, 35)),
    nextRunAt: formatISO(addShift(now, { hours: 4 })),
    lastRunStatus: 'on_time',
    enabled: true,
    owner: 'Ravi Patel'
  },
  {
    id: 'sched-finance-monthly',
    name: 'Treasury compliance pack',
    cadence: 'monthly',
    deliveryFormat: 'teams',
    recipients: ['finance.leadership@blackwellen.com', 'treasury.ops@blackwellen.com'],
    filters: { dataset: 'finance', timeframe: '30d', segment: 'global' },
    lastRunAt: formatISO(subDays(now, 12)),
    nextRunAt: formatISO(addShift(now, { days: 18 })),
    lastRunStatus: 'delayed',
    enabled: true,
    owner: 'Elena Novak'
  }
];

const analyticsSecurityControls: AnalyticsSecurityControl[] = [
  {
    id: 'ctrl-encryption',
    name: 'Dataset encryption & key rotation',
    status: 'healthy',
    owner: 'Security Operations',
    lastReviewed: formatISO(subDays(now, 12)),
    description: 'Warehouse, lakehouse and BI extracts encrypted with automated rotation policies.',
    requiredActions: ['Rotate analytics vault keys by 30 Jun'],
    coverage: 1
  },
  {
    id: 'ctrl-rbac',
    name: 'Role-based access reviews',
    status: 'warning',
    owner: 'Identity Engineering',
    lastReviewed: formatISO(subDays(now, 28)),
    description: 'Quarterly analytics RBAC review flagged two stale service accounts pending removal.',
    requiredActions: ['Deactivate stale service accounts', 'Schedule next access review workshop'],
    coverage: 0.88
  },
  {
    id: 'ctrl-mobile',
    name: 'Mobile device compliance policy',
    status: 'warning',
    owner: 'Mobile Platform Lead',
    lastReviewed: formatISO(subDays(now, 7)),
    description: 'BYOD exceptions require refreshed attestation and updated patch posture.',
    requiredActions: ['Notify non-compliant device owners', 'Revalidate BYOD exception list'],
    coverage: 0.82
  }
];

const baselineMobileSecurity: MobileSecurityPosture = {
  managedDevices: 1860,
  compliantDevices: 1752,
  pendingRemediations: 48,
  blockedDevices: 6,
  lastAudit: formatISO(subDays(now, 5)),
  pushOptInRate: 0.91,
  crashFreeSessions: 0.984,
  mfaCoverage: 0.972,
  comment: 'Zero-trust health at 92%. Rolling out biometric attestation for field devices this sprint.'
};

const ALL_SEGMENTS: MetricSegment[] = ['global', 'emea', 'apac', 'amer'];
const ALL_TIMEFRAMES: MetricTimeframe[] = ['7d', '30d', '90d'];

const TREND_CONFIG: Record<MetricTimeframe, { points: number; interval: number }> = {
  '7d': { points: 7, interval: 1 },
  '30d': { points: 6, interval: 5 },
  '90d': { points: 9, interval: 10 }
};

function addShift(date: Date, shift: { hours?: number; days?: number }): Date {
  const next = new Date(date);
  if (shift.hours) {
    next.setHours(next.getHours() + shift.hours);
  }
  if (shift.days) {
    next.setDate(next.getDate() + shift.days);
  }
  return next;
}

function round(value: number, precision: number) {
  return Number(value.toFixed(precision));
}

function buildTrendSeries(
  value: number,
  delta: number,
  timeframe: MetricTimeframe,
  precision: number
): AnalyticsTrendPoint[] {
  const config = TREND_CONFIG[timeframe];
  const start = value - delta;
  return Array.from({ length: config.points }, (_, index) => {
    const ratio = config.points === 1 ? 1 : index / (config.points - 1);
    const oscillation = Math.sin(index) * (delta === 0 ? 0.01 : delta * 0.05);
    const computed = start + delta * ratio + oscillation;
    return {
      timestamp: formatISO(subDays(now, config.interval * (config.points - index - 1))),
      value: round(computed, precision)
    };
  });
}

function formatSegment(segment: MetricSegment) {
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

function formatValue(unit: AnalyticsKpi['unit'], value: number, precision: number) {
  if (unit === 'percentage') {
    return `${(value * 100).toFixed(Math.min(precision + 1, 2))}%`;
  }
  if (unit === 'currency') {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  if (unit === 'duration') {
    return `${value.toFixed(1)} hrs`;
  }
  return value.toLocaleString();
}

function formatDelta(unit: AnalyticsKpi['unit'], delta: number, precision: number) {
  const sign = delta > 0 ? '+' : '';
  if (unit === 'percentage') {
    return `${sign}${(delta * 100).toFixed(Math.min(precision + 1, 2))}pp`;
  }
  if (unit === 'currency') {
    const absolute = Math.abs(delta);
    if (absolute >= 1_000_000) {
      return `${sign}$${(absolute / 1_000_000).toFixed(1)}M`;
    }
    return `${sign}$${(absolute / 1_000).toFixed(0)}K`;
  }
  if (unit === 'duration') {
    return `${sign}${Math.abs(delta).toFixed(1)} hrs`;
  }
  const rounded = Math.round(delta);
  return `${sign}${Math.abs(rounded).toLocaleString()}`;
}

function deriveAlerts(kpis: AnalyticsKpi[], params: AnalyticsQueryParams): AnalyticsAlert[] {
  const alerts: AnalyticsAlert[] = [];
  const segmentLabel = formatSegment(params.segment);

  const pushAlert = (
    id: string,
    title: string,
    severity: AnalyticsAlert['severity'],
    description: string,
    recommendedAction: string,
    owner: string,
    metricIds: string[],
    impact: string,
    slaHours: number,
    acknowledgedAt?: string
  ) => {
    alerts.push({
      id,
      title,
      severity,
      status: acknowledgedAt ? 'acknowledged' : 'active',
      detectedAt: formatISO(subMinutes(now, severity === 'critical' ? 45 : 120)),
      acknowledgedAt,
      description,
      recommendedAction,
      owner,
      metricIds,
      impact,
      slaHours,
      impactedSegments: [params.segment]
    });
  };

  if (params.dataset === 'engagement') {
    const responseRate = kpis.find((kpi) => kpi.id === 'engagement-response-rate');
    const attrition = kpis.find((kpi) => kpi.id === 'engagement-attrition-risk');

    if (responseRate && responseRate.value < (responseRate.target ?? 0.78)) {
      pushAlert(
        'alert-engagement-response',
        `${segmentLabel} response rate below target`,
        responseRate.status === 'at-risk' ? 'high' : 'medium',
        `${segmentLabel} participation sits at ${formatValue(responseRate.unit, responseRate.value, responseRate.precision ?? 2)} against a ${(responseRate.target ?? 0.78) * 100}% target.`,
        'Trigger reminder campaign with personalised nudges and manager prompts.',
        'Employee Listening Lead',
        [responseRate.id],
        'Sustained low response weakens sentiment modelling accuracy.',
        48
      );
    }

    if (attrition && attrition.value > (attrition.target ?? 0.07)) {
      pushAlert(
        'alert-engagement-attrition',
        `${segmentLabel} attrition risk trending up`,
        'high',
        `${segmentLabel} attrition forecast is ${formatValue(attrition.unit, attrition.value, attrition.precision ?? 2)} with week-on-week increase of ${formatDelta(attrition.unit, attrition.delta, attrition.precision ?? 2)}.`,
        'Schedule stay interviews for impacted cohorts and fast-track retention packages.',
        'People Analytics Manager',
        [attrition.id],
        'Rising attrition risk impacts workforce planning and service capacity.',
        24
      );
    }
  }

  if (params.dataset === 'service') {
    const sla = kpis.find((kpi) => kpi.id === 'service-sla-compliance');
    const firstResponse = kpis.find((kpi) => kpi.id === 'service-first-response');

    if (sla && sla.value < 0.92) {
      pushAlert(
        'alert-service-sla',
        `${segmentLabel} SLA compliance deteriorating`,
        sla.status === 'at-risk' ? 'high' : 'medium',
        `${segmentLabel} closed ${formatValue(sla.unit, sla.value, sla.precision ?? 2)} of tickets within SLA; backlog automation audit required.`,
        'Rebalance queue ownership and enable back-office auto approvals for low-risk requests.',
        'Service Operations Manager',
        [sla.id],
        'SLA breaches increase escalations and downstream finance impacts.',
        12
      );
    }

    if (firstResponse && firstResponse.value > 3.9) {
      pushAlert(
        'alert-service-first-response',
        `${segmentLabel} first response lag`,
        'medium',
        `First response averages ${formatValue(firstResponse.unit, firstResponse.value, firstResponse.precision ?? 2)} (${formatDelta(firstResponse.unit, firstResponse.delta, firstResponse.precision ?? 2)}).`,
        'Activate follow-the-sun roster and run incident simulation to validate warm handovers.',
        'Workflow Enablement Lead',
        [firstResponse.id],
        'Delayed first responses erode NPS and compliance commitments.',
        18,
        formatISO(subMinutes(now, 15))
      );
    }
  }

  if (params.dataset === 'finance') {
    const spend = kpis.find((kpi) => kpi.id === 'finance-spend-variance');
    const compliance = kpis.find((kpi) => kpi.id === 'finance-compliance-complete');

    if (spend && spend.value > 250000) {
      pushAlert(
        'alert-finance-spend',
        `${segmentLabel} spend variance above threshold`,
        spend.status === 'at-risk' ? 'critical' : 'high',
        `${segmentLabel} variance is ${formatValue(spend.unit, spend.value, 0)} (${formatDelta(spend.unit, spend.delta, 0)}) vs $200K ceiling.`,
        'Escalate approval routing for discretionary spend and sync with procurement for contract renegotiations.',
        'Finance Controller',
        [spend.id],
        'Overspend pressures cash flow and budget reforecast commitments.',
        24
      );
    }

    if (compliance && compliance.value < 0.96) {
      pushAlert(
        'alert-finance-compliance',
        `${segmentLabel} control attestations lagging`,
        'medium',
        `Control attestations at ${formatValue(compliance.unit, compliance.value, compliance.precision ?? 2)} (${formatDelta(compliance.unit, compliance.delta, compliance.precision ?? 2)}).`,
        'Trigger compliance reminders and assign deputy reviewers to unblock finance attestations.',
        'Risk & Compliance Lead',
        [compliance.id],
        'Delayed attestations risk audit findings during quarter close.',
        36,
        formatISO(subMinutes(now, 5))
      );
    }
  }

  return alerts;
}

function pickSchedules(params: AnalyticsQueryParams): AnalyticsReportSchedule[] {
  return analyticsReportSchedules
    .filter((schedule) => schedule.filters.dataset === params.dataset)
    .map((schedule) => ({ ...schedule }));
}

function deriveAiInsights(
  kpis: AnalyticsKpi[],
  alerts: AnalyticsAlert[],
  params: AnalyticsQueryParams
): string[] {
  const improvements = [...kpis].filter((kpi) => kpi.delta > 0).sort((a, b) => b.delta - a.delta);
  const regressions = [...kpis]
    .filter((kpi) => kpi.delta < 0 || kpi.status === 'at-risk')
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const insights: string[] = [];

  if (improvements[0]) {
    const metric = improvements[0];
    insights.push(
      `${metric.label} improved ${formatDelta(metric.unit, metric.delta, metric.precision ?? 2)} ${metric.comparisonPeriod}, now ${formatValue(metric.unit, metric.value, metric.precision ?? 2)}.`
    );
  }

  if (regressions[0]) {
    const metric = regressions[0];
    insights.push(
      `${metric.label} requires attention — trending ${formatDelta(metric.unit, metric.delta, metric.precision ?? 2)} ${metric.comparisonPeriod} (${metric.status}).`
    );
  }

  if (alerts[0]) {
    const alert = alerts[0];
    insights.push(`${alert.title} needs action within ${alert.slaHours}h: ${alert.recommendedAction}`);
  }

  if (insights.length < 3) {
    const dataset = analyticsDatasets.find((item) => item.key === params.dataset);
    if (dataset) {
      insights.push(`${dataset.name} coverage refreshed ${formatSegment(params.segment)} ${params.timeframe} window.`);
    }
  }

  return insights.slice(0, 3);
}

function deriveStoryHighlights(
  kpis: AnalyticsKpi[],
  params: AnalyticsQueryParams
): AnalyticsSnapshot['storyHighlights'] {
  const sorted = [...kpis].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const highlights: AnalyticsSnapshot['storyHighlights'] = [];

  if (sorted[0]) {
    const metric = sorted[0];
    highlights.push({
      id: `${metric.id}-momentum`,
      title: `${metric.label} momentum`,
      summary: `${metric.label} is ${metric.delta >= 0 ? 'up' : 'down'} ${formatDelta(metric.unit, metric.delta, metric.precision ?? 2)} ${metric.comparisonPeriod}.`,
      metricIds: [metric.id]
    });
  }

  const riskMetric = sorted.find((metric) => metric.status === 'at-risk');
  if (riskMetric) {
    highlights.push({
      id: `${riskMetric.id}-risk`,
      title: `${riskMetric.label} risk`,
      summary: `${riskMetric.label} status flagged ${riskMetric.status}. Current value ${formatValue(riskMetric.unit, riskMetric.value, riskMetric.precision ?? 2)}.`,
      metricIds: [riskMetric.id]
    });
  }

  if (highlights.length < 2 && sorted[1]) {
    const metric = sorted[1];
    highlights.push({
      id: `${metric.id}-watch`,
      title: `${metric.label} watch`,
      summary: `${metric.label} shift of ${formatDelta(metric.unit, metric.delta, metric.precision ?? 2)} ${metric.comparisonPeriod}.`,
      metricIds: [metric.id]
    });
  }

  return highlights;
}

function buildSecurityControls(params: AnalyticsQueryParams): AnalyticsSecurityControl[] {
  return analyticsSecurityControls.map((control) => {
    if (control.id === 'ctrl-rbac') {
      return {
        ...control,
        description: `${control.description} ${formatSegment(params.segment)} dataset owners to confirm access by Friday.`
      };
    }
    if (control.id === 'ctrl-mobile' && params.dataset !== 'engagement') {
      return {
        ...control,
        description: `${control.description} Additional device attestation required for ${params.dataset} approvers.`
      };
    }
    return { ...control };
  });
}

function buildMobileSecurity(
  params: AnalyticsQueryParams,
  alerts: AnalyticsAlert[]
): MobileSecurityPosture {
  const posture: MobileSecurityPosture = { ...baselineMobileSecurity };

  if (params.dataset === 'service' && params.segment === 'apac') {
    posture.pendingRemediations = 56;
    posture.comment = 'APAC field tablets awaiting OS patch rollout; deployment scheduled overnight.';
  } else if (params.dataset === 'finance') {
    posture.pendingRemediations = 38;
    posture.comment = 'Finance approvers validating device encryption prior to quarter close.';
  } else {
    posture.pendingRemediations = 44;
    posture.comment = 'Engagement campaigns require refreshed push certificates; rollout in progress.';
  }

  if (alerts.some((alert) => alert.id === 'alert-finance-spend')) {
    posture.comment += ' Finance governance tightened until variance normalises.';
  }

  return posture;
}

function buildDataQuality(
  params: AnalyticsQueryParams,
  alerts: AnalyticsAlert[]
): AnalyticsSnapshot['dataQuality'] {
  const anomalyCount = alerts.filter((alert) => alert.severity === 'high' || alert.severity === 'critical').length;
  const completeness = params.dataset === 'finance' ? 0.99 : params.dataset === 'service' ? 0.96 : 0.97;

  let coverageNotes = '';
  if (params.dataset === 'service') {
    coverageNotes = `${formatSegment(params.segment)} realtime streams validated with ${anomalyCount} anomalies in the last ${params.timeframe}.`;
  } else if (params.dataset === 'finance') {
    coverageNotes = `Ledger sync complete with ${(completeness * 100).toFixed(1)}% reconciliation coverage for ${params.timeframe}.`;
  } else {
    coverageNotes = `${formatSegment(params.segment)} survey ingestion at ${(completeness * 100).toFixed(1)}% after overnight recovery job.`;
  }

  return {
    completeness,
    anomalyCount,
    coverageNotes
  };
}

export const mockAnalyticsReportSchedules = analyticsReportSchedules.map((schedule) => ({ ...schedule }));

export function createMockAnalyticsSnapshot(params: AnalyticsQueryParams): AnalyticsSnapshot {
  const dataset = analyticsDatasets.find((item) => item.key === params.dataset) ?? analyticsDatasets[0];
  const metrics = analyticsMetricDefinitions.filter((definition) => definition.dataset === dataset.key);

  const kpis: AnalyticsKpi[] = metrics.map((definition) => {
    const segmentConfig = definition.segments[params.segment] ?? definition.segments.global;
    const timeframeConfig = segmentConfig[params.timeframe];
    return {
      id: definition.id,
      label: definition.label,
      unit: definition.unit,
      value: round(timeframeConfig.value, definition.precision),
      delta: round(timeframeConfig.delta, definition.precision),
      comparisonPeriod: timeframeConfig.comparison,
      target: definition.target,
      owner: definition.owner,
      status: timeframeConfig.status,
      narrative: definition.narrative,
      trend: buildTrendSeries(timeframeConfig.value, timeframeConfig.delta, params.timeframe, definition.precision),
      precision: definition.precision
    };
  });

  const alerts = deriveAlerts(kpis, params);
  const schedules = pickSchedules(params);
  const aiInsights = deriveAiInsights(kpis, alerts, params);
  const storyHighlights = deriveStoryHighlights(kpis, params);
  const securityControls = buildSecurityControls(params);
  const mobileSecurity = buildMobileSecurity(params, alerts);
  const dataQuality = buildDataQuality(params, alerts);

  const baseLag = dataset.key === 'service' ? 6 : dataset.key === 'finance' ? 20 : 12;
  const timeframeMultiplier = params.timeframe === '7d' ? 0.6 : params.timeframe === '30d' ? 1 : 1.4;
  const freshnessLagMinutes = Math.round(baseLag * timeframeMultiplier);

  return {
    availableDatasets: analyticsDatasets.map((item) => ({ ...item })),
    availableSegments: [...ALL_SEGMENTS],
    availableTimeframes: [...ALL_TIMEFRAMES],
    dataset,
    timeframe: params.timeframe,
    segment: params.segment,
    lastRefreshed: formatISO(subMinutes(now, freshnessLagMinutes)),
    freshnessLagMinutes,
    dataSource: dataset.key === 'service' ? 'stream' : 'warehouse',
    kpis,
    alerts,
    schedules,
    aiInsights,
    securityControls,
    mobileSecurity,
    dataQuality,
    storyHighlights
  };
}
