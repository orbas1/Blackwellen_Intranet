import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { formatISO, subDays, subMinutes } from 'date-fns';

export type DataSource = 'api' | 'cache' | 'fallback';

export type ApiResult<T> = {
  data: T;
  source: DataSource;
  stale: boolean;
  fetchedAt: number;
};

export interface DirectoryEntry {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  skills: string[];
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  updatedAt: string;
  author: string;
  status: 'approved' | 'draft' | 'archived';
  tags: string[];
}

export interface WorkflowSummary {
  id: string;
  name: string;
  slaHours: number;
  queueDepth: number;
  healthy: boolean;
  breachedPercent: number;
  backlogTrend: 'up' | 'down' | 'steady';
  avgCompletionHours: number;
}

export interface QuickActionWidget {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  link?: string;
}

export type AnalyticsDatasetKey = 'engagement' | 'service' | 'finance';
export type AnalyticsTimeframe = '7d' | '30d' | '90d';
export type AnalyticsSegment = 'global' | 'emea' | 'apac' | 'amer';

export interface AnalyticsKpi {
  id: string;
  label: string;
  unit: 'percentage' | 'currency' | 'duration';
  value: number;
  delta: number;
  comparisonPeriod: string;
  status: 'exceeding' | 'on-track' | 'watch' | 'at-risk';
}

export interface AnalyticsAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged';
  description: string;
  recommendedAction: string;
  owner: string;
  impact: string;
  slaHours: number;
}

export interface AnalyticsReportSchedule {
  id: string;
  name: string;
  cadence: 'daily' | 'weekly' | 'monthly';
  deliveryFormat: 'email' | 'slack' | 'teams';
  nextRunAt: string;
  enabled: boolean;
  dataset: AnalyticsDatasetKey;
}

export interface MobileSecurityPosture {
  compliantDevices: number;
  pendingRemediations: number;
  pushOptInRate: number;
  crashFreeSessions: number;
  lastAudit: string;
  comment: string;
}

export interface AnalyticsSnapshot {
  dataset: AnalyticsDatasetKey;
  datasetName: string;
  segment: AnalyticsSegment;
  timeframe: AnalyticsTimeframe;
  lastUpdated: string;
  lagMinutes: number;
  kpis: AnalyticsKpi[];
  alerts: AnalyticsAlert[];
  highlights: string[];
  schedules: AnalyticsReportSchedule[];
  mobileSecurity: MobileSecurityPosture;
}

export interface AnalyticsQueryParams {
  dataset: AnalyticsDatasetKey;
  timeframe: AnalyticsTimeframe;
  segment: AnalyticsSegment;
}

const client = axios.create({
  baseURL: 'https://intranet.blackwellen.com/api',
  timeout: 8000
});

const CACHE_PREFIX = 'blackwellen-mobile-cache:v1:';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

const DIRECTORY_FALLBACK: DirectoryEntry[] = [
  {
    id: 'u-100',
    name: 'Danielle Rivers',
    role: 'Head of People Operations',
    department: 'People',
    location: 'London',
    email: 'danielle.rivers@blackwellen.com',
    phone: '+44 20 3996 1000',
    skills: ['People Strategy', 'Learning & Development', 'HR Analytics']
  },
  {
    id: 'u-101',
    name: 'Leo Ng',
    role: 'Director of Digital Workplace',
    department: 'Technology',
    location: 'Singapore',
    email: 'leo.ng@blackwellen.com',
    phone: '+65 6321 4455',
    skills: ['Product Strategy', 'Automation', 'Analytics']
  }
];

const KNOWLEDGE_FALLBACK: KnowledgeArticle[] = [
  {
    id: 'kb-001',
    title: 'Adaptive home widget governance',
    summary: 'Guidelines for targeting, analytics, and experimentation within the adaptive home experience.',
    category: 'Digital Workplace',
    updatedAt: '2024-04-22T09:30:00.000Z',
    author: 'Leo Ng',
    status: 'approved',
    tags: ['governance', 'widgets', 'analytics']
  },
  {
    id: 'kb-002',
    title: 'Knowledge retention and attestation playbook',
    summary: 'Policy for quarterly attestation, versioning, and acknowledgement flows.',
    category: 'Compliance',
    updatedAt: '2024-04-12T11:00:00.000Z',
    author: 'Danielle Rivers',
    status: 'approved',
    tags: ['compliance', 'policies']
  }
];

const WORKFLOW_FALLBACK: WorkflowSummary[] = [
  {
    id: 'wf-001',
    name: 'IT Hardware Request',
    slaHours: 24,
    queueDepth: 6,
    healthy: true,
    breachedPercent: 4,
    backlogTrend: 'down',
    avgCompletionHours: 19
  },
  {
    id: 'wf-002',
    name: 'Vendor Onboarding',
    slaHours: 72,
    queueDepth: 14,
    healthy: false,
    breachedPercent: 22,
    backlogTrend: 'up',
    avgCompletionHours: 86
  }
];

const WIDGET_FALLBACK: QuickActionWidget[] = [
  {
    id: 'celebrations',
    title: 'Celebrations',
    description: 'Three colleagues have upcoming milestones. Celebrate them or schedule a note.',
    actionLabel: 'View celebrations'
  },
  {
    id: 'compliance',
    title: 'Compliance tracker',
    description: 'APAC HR attestation is at 87% completion with 18 outstanding sign-offs.',
    actionLabel: 'Review attestations'
  }
];


const ANALYTICS_DATASETS: Record<AnalyticsDatasetKey, string> = {
  engagement: 'Employee Engagement',
  service: 'Service Operations Health',
  finance: 'Finance & Investment Performance'
};

type MetricTimeframe = AnalyticsTimeframe;
type MetricSegment = AnalyticsSegment;

type MetricValueConfig = {
  value: number;
  delta: number;
  status: AnalyticsKpi['status'];
  comparison: string;
};

type AnalyticsMetricDefinition = {
  id: string;
  label: string;
  dataset: AnalyticsDatasetKey;
  unit: AnalyticsKpi['unit'];
  segments: Record<MetricSegment, Record<MetricTimeframe, MetricValueConfig>>;
};

const analyticsMetricDefinitions: AnalyticsMetricDefinition[] = [
  {
    id: 'engagement-response-rate',
    label: 'Pulse survey response rate',
    dataset: 'engagement',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.74, delta: 0.02, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.71, delta: 0.05, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.69, delta: 0.06, status: 'watch', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.8, delta: 0.01, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.79, delta: 0.03, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 0.77, delta: 0.04, status: 'on-track', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.76, delta: 0.04, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.72, delta: 0.07, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.68, delta: 0.05, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.7, delta: -0.01, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 0.69, delta: 0.01, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 0.67, delta: 0.02, status: 'at-risk', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'engagement-sentiment',
    label: 'Favourability index',
    dataset: 'engagement',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.82, delta: 0.01, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.81, delta: 0.02, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.79, delta: 0.03, status: 'watch', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.86, delta: 0.02, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.84, delta: 0.03, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 0.82, delta: 0.04, status: 'watch', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.85, delta: 0.03, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.83, delta: 0.04, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.8, delta: 0.05, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.8, delta: -0.01, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 0.79, delta: 0, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 0.77, delta: 0.01, status: 'at-risk', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'engagement-attrition-risk',
    label: 'Projected voluntary attrition',
    dataset: 'engagement',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.068, delta: -0.004, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.072, delta: -0.006, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 0.078, delta: -0.01, status: 'watch', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.062, delta: -0.005, status: 'exceeding', comparison: 'vs prior 7 days' },
        '30d': { value: 0.064, delta: -0.008, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 0.069, delta: -0.009, status: 'on-track', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.075, delta: -0.003, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.079, delta: -0.002, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.083, delta: -0.001, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.081, delta: 0.002, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 0.085, delta: 0.004, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 0.089, delta: 0.006, status: 'at-risk', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'service-sla-compliance',
    label: 'SLA compliance rate',
    dataset: 'service',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.91, delta: -0.02, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.93, delta: -0.01, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.95, delta: 0, status: 'on-track', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.95, delta: 0, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.96, delta: 0.01, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 0.97, delta: 0.01, status: 'exceeding', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.89, delta: -0.03, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 0.9, delta: -0.02, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 0.92, delta: -0.01, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.93, delta: -0.01, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.94, delta: 0, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.95, delta: 0.01, status: 'on-track', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'service-first-response',
    label: 'First response time (hrs)',
    dataset: 'service',
    unit: 'duration',
    segments: {
      global: {
        '7d': { value: 4.1, delta: 0.4, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 3.8, delta: 0.2, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 3.6, delta: -0.1, status: 'on-track', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 3.4, delta: -0.2, status: 'exceeding', comparison: 'vs prior 7 days' },
        '30d': { value: 3.3, delta: -0.3, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 3.2, delta: -0.4, status: 'exceeding', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 4.6, delta: 0.5, status: 'at-risk', comparison: 'vs prior 7 days' },
        '30d': { value: 4.2, delta: 0.3, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 4, delta: 0.1, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 3.9, delta: 0.3, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 3.7, delta: 0.1, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 3.5, delta: -0.05, status: 'on-track', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'service-automation-coverage',
    label: 'Automation coverage',
    dataset: 'service',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.58, delta: 0.01, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.6, delta: 0.04, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 0.63, delta: 0.07, status: 'exceeding', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.62, delta: 0.03, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.64, delta: 0.05, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 0.67, delta: 0.08, status: 'exceeding', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.55, delta: 0.02, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.57, delta: 0.03, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.6, delta: 0.05, status: 'on-track', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.59, delta: 0.02, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.61, delta: 0.03, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 0.63, delta: 0.05, status: 'exceeding', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'finance-spend-variance',
    label: 'Spend variance (USD)',
    dataset: 'finance',
    unit: 'currency',
    segments: {
      global: {
        '7d': { value: 180000, delta: -20000, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 250000, delta: 50000, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 320000, delta: 70000, status: 'at-risk', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 140000, delta: -15000, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 200000, delta: -10000, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 260000, delta: 20000, status: 'watch', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 210000, delta: -10000, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 270000, delta: 20000, status: 'at-risk', comparison: 'vs prior 30 days' },
        '90d': { value: 340000, delta: 50000, status: 'at-risk', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 190000, delta: -5000, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 260000, delta: 30000, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 310000, delta: 40000, status: 'at-risk', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'finance-investment-yield',
    label: 'Investment yield',
    dataset: 'finance',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.046, delta: 0.003, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.044, delta: 0.002, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.042, delta: 0.001, status: 'watch', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.048, delta: 0.004, status: 'exceeding', comparison: 'vs prior 7 days' },
        '30d': { value: 0.046, delta: 0.003, status: 'on-track', comparison: 'vs prior 30 days' },
        '90d': { value: 0.044, delta: 0.002, status: 'watch', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.043, delta: 0.002, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.041, delta: 0.001, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.039, delta: 0, status: 'at-risk', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.045, delta: 0.002, status: 'on-track', comparison: 'vs prior 7 days' },
        '30d': { value: 0.043, delta: 0.001, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.041, delta: 0, status: 'watch', comparison: 'vs prior quarter' }
      }
    }
  },
  {
    id: 'finance-compliance-complete',
    label: 'Finance control attestations',
    dataset: 'finance',
    unit: 'percentage',
    segments: {
      global: {
        '7d': { value: 0.96, delta: 0.01, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.965, delta: 0.015, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.972, delta: 0.02, status: 'on-track', comparison: 'vs prior quarter' }
      },
      emea: {
        '7d': { value: 0.985, delta: 0.005, status: 'exceeding', comparison: 'vs prior 7 days' },
        '30d': { value: 0.988, delta: 0.008, status: 'exceeding', comparison: 'vs prior 30 days' },
        '90d': { value: 0.99, delta: 0.01, status: 'exceeding', comparison: 'vs prior quarter' }
      },
      apac: {
        '7d': { value: 0.95, delta: 0.012, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.955, delta: 0.014, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.962, delta: 0.016, status: 'watch', comparison: 'vs prior quarter' }
      },
      amer: {
        '7d': { value: 0.953, delta: 0.009, status: 'watch', comparison: 'vs prior 7 days' },
        '30d': { value: 0.958, delta: 0.012, status: 'watch', comparison: 'vs prior 30 days' },
        '90d': { value: 0.968, delta: 0.015, status: 'on-track', comparison: 'vs prior quarter' }
      }
    }
  }
];

const analyticsSchedules: AnalyticsReportSchedule[] = [
  {
    id: 'sched-executive-weekly',
    name: 'Executive KPI digest',
    cadence: 'weekly',
    deliveryFormat: 'email',
    nextRunAt: formatISO(subMinutes(new Date(), -720)),
    enabled: true,
    dataset: 'engagement'
  },
  {
    id: 'sched-ops-daily',
    name: 'Operations health stand-up',
    cadence: 'daily',
    deliveryFormat: 'slack',
    nextRunAt: formatISO(subMinutes(new Date(), -180)),
    enabled: true,
    dataset: 'service'
  },
  {
    id: 'sched-finance-monthly',
    name: 'Treasury compliance pack',
    cadence: 'monthly',
    deliveryFormat: 'teams',
    nextRunAt: formatISO(subDays(new Date(), -18)),
    enabled: true,
    dataset: 'finance'
  }
];

const mobileSecurityBaselines: Record<AnalyticsDatasetKey, MobileSecurityPosture> = {
  engagement: {
    compliantDevices: 1752,
    pendingRemediations: 44,
    pushOptInRate: 0.91,
    crashFreeSessions: 0.984,
    lastAudit: formatISO(subDays(new Date(), 5)),
    comment: 'Engagement campaigns require refreshed push certificates; rollout in progress.'
  },
  service: {
    compliantDevices: 1689,
    pendingRemediations: 56,
    pushOptInRate: 0.88,
    crashFreeSessions: 0.972,
    lastAudit: formatISO(subDays(new Date(), 4)),
    comment: 'APAC field tablets awaiting OS patch rollout; deployment scheduled overnight.'
  },
  finance: {
    compliantDevices: 1610,
    pendingRemediations: 38,
    pushOptInRate: 0.9,
    crashFreeSessions: 0.979,
    lastAudit: formatISO(subDays(new Date(), 6)),
    comment: 'Finance approvers validating device encryption prior to quarter close.'
  }
};

const DEFAULT_ANALYTICS_PARAMS: AnalyticsQueryParams = {
  dataset: 'engagement',
  timeframe: '30d',
  segment: 'global'
};

function formatHighlightValue(kpi: AnalyticsKpi) {
  if (kpi.unit === 'percentage') {
    return `${(kpi.value * 100).toFixed(1)}%`;
  }
  if (kpi.unit === 'currency') {
    return kpi.value >= 1_000_000 ? `$${(kpi.value / 1_000_000).toFixed(1)}M` : `$${(kpi.value / 1_000).toFixed(0)}K`;
  }
  if (kpi.unit === 'duration') {
    return `${kpi.value.toFixed(1)} hrs`;
  }
  return kpi.value.toLocaleString();
}

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

function deriveAlertSummary(params: AnalyticsQueryParams, kpis: AnalyticsKpi[]): AnalyticsAlert[] {
  const alerts: AnalyticsAlert[] = [];
  const byId = Object.fromEntries(kpis.map((kpi) => [kpi.id, kpi]));

  if (params.dataset === 'engagement') {
    const attrition = byId['engagement-attrition-risk'];
    if (attrition && attrition.status === 'at-risk') {
      alerts.push({
        id: 'mobile-alert-attrition',
        title: `${formatSegmentLabel(params.segment)} attrition risk`,
        severity: 'high',
        status: 'active',
        description: `${formatHighlightValue(attrition)} projected attrition ${attrition.comparisonPeriod}.`,
        recommendedAction: 'Schedule stay interviews and launch retention accelerators for impacted teams.',
        owner: 'People Analytics Manager',
        impact: 'Rising attrition introduces capacity risk for Q3 initiatives.',
        slaHours: 24
      });
    }
  }

  if (params.dataset === 'service') {
    const sla = byId['service-sla-compliance'];
    if (sla && (sla.status === 'watch' || sla.status === 'at-risk')) {
      alerts.push({
        id: 'mobile-alert-sla',
        title: `${formatSegmentLabel(params.segment)} SLA compliance`,
        severity: sla.status === 'at-risk' ? 'high' : 'medium',
        status: 'active',
        description: `Compliance at ${formatHighlightValue(sla)} (${sla.comparisonPeriod}).`,
        recommendedAction: 'Rebalance queues and enable automation templates for low-complexity requests.',
        owner: 'Service Operations Manager',
        impact: 'Breaches trigger executive escalations and satisfaction risk.',
        slaHours: 12
      });
    }
  }

  if (params.dataset === 'finance') {
    const spend = byId['finance-spend-variance'];
    if (spend && spend.status !== 'on-track') {
      alerts.push({
        id: 'mobile-alert-spend',
        title: `${formatSegmentLabel(params.segment)} spend variance`,
        severity: spend.status === 'at-risk' ? 'critical' : 'high',
        status: 'active',
        description: `Variance currently ${formatHighlightValue(spend)} (${spend.comparisonPeriod}).`,
        recommendedAction: 'Tighten discretionary approvals and align with procurement on vendor renegotiations.',
        owner: 'Finance Controller',
        impact: 'Overspend pressures cash flow and quarter-close commitments.',
        slaHours: 24
      });
    }
  }

  return alerts;
}

function formatHighlights(params: AnalyticsQueryParams, kpis: AnalyticsKpi[], alerts: AnalyticsAlert[]): string[] {
  const primary = kpis[0];
  const secondary = kpis.find((kpi) => kpi.status === 'exceeding') ?? kpis[1];
  const messages: string[] = [];

  if (primary) {
    messages.push(
      `${primary.label} ${primary.delta >= 0 ? 'improved' : 'shifted'} ${Math.abs(primary.delta) >= 1 && primary.unit === 'currency' ? `$${(Math.abs(primary.delta) / 1_000).toFixed(0)}K` : primary.unit === 'percentage' ? `${(primary.delta * 100).toFixed(1)}pp` : primary.unit === 'duration' ? `${Math.abs(primary.delta).toFixed(1)} hrs` : Math.abs(primary.delta).toFixed(1)} ${primary.comparisonPeriod}.`
    );
  }

  if (secondary) {
    messages.push(`${secondary.label} now ${formatHighlightValue(secondary)} (${secondary.status}).`);
  }

  if (alerts[0]) {
    messages.push(`${alerts[0].title} requires action within ${alerts[0].slaHours}h.`);
  }

  return messages.slice(0, 3);
}

function selectSchedules(dataset: AnalyticsDatasetKey) {
  return analyticsSchedules.filter((schedule) => schedule.dataset === dataset);
}

function createAnalyticsSnapshot(params: AnalyticsQueryParams): AnalyticsSnapshot {
  const definitions = analyticsMetricDefinitions.filter((definition) => definition.dataset === params.dataset);
  const datasetName = ANALYTICS_DATASETS[params.dataset];

  const kpis: AnalyticsKpi[] = definitions.map((definition) => {
    const segmentValues = definition.segments[params.segment] ?? definition.segments.global;
    const timeframe = segmentValues[params.timeframe];
    return {
      id: definition.id,
      label: definition.label,
      unit: definition.unit,
      value: timeframe.value,
      delta: timeframe.delta,
      comparisonPeriod: timeframe.comparison,
      status: timeframe.status
    };
  });

  const alerts = deriveAlertSummary(params, kpis);
  const highlights = formatHighlights(params, kpis, alerts);
  const schedules = selectSchedules(params.dataset);
  const mobileSecurity = mobileSecurityBaselines[params.dataset];
  const lagBase = params.dataset === 'service' ? 6 : params.dataset === 'finance' ? 20 : 12;
  const lagMultiplier = params.timeframe === '7d' ? 0.6 : params.timeframe === '30d' ? 1 : 1.3;
  const lagMinutes = Math.round(lagBase * lagMultiplier);

  return {
    dataset: params.dataset,
    datasetName,
    segment: params.segment,
    timeframe: params.timeframe,
    lastUpdated: formatISO(subMinutes(new Date(), lagMinutes)),
    lagMinutes,
    kpis,
    alerts,
    highlights,
    schedules,
    mobileSecurity
  };
}

async function readCache<T>(key: string): Promise<ApiResult<T> | null> {
  const stored = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as ApiResult<T>;
    return parsed;
  } catch (error) {
    console.warn('Failed to parse cache entry', key, error);
    return null;
  }
}

async function writeCache<T>(key: string, payload: T) {
  const value: ApiResult<T> = {
    data: payload,
    source: 'api',
    stale: false,
    fetchedAt: Date.now()
  };
  await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(value));
}

async function safeGet<T>(key: string, path: string, fallback: T): Promise<ApiResult<T>> {
  try {
    const response = await client.get<T>(path);
    await writeCache(key, response.data);
    return {
      data: response.data,
      source: 'api',
      stale: false,
      fetchedAt: Date.now()
    };
  } catch (error) {
    console.warn('Falling back to cached data', { key, error });
    const cached = await readCache<T>(key);
    if (cached) {
      const stale = Date.now() - cached.fetchedAt > CACHE_TTL;
      return { ...cached, source: 'cache', stale };
    }
    return {
      data: fallback,
      source: 'fallback',
      stale: true,
      fetchedAt: Date.now()
    };
  }
}

export function fetchDirectory(): Promise<ApiResult<DirectoryEntry[]>> {
  return safeGet('directory', '/directory', DIRECTORY_FALLBACK);
}

export function fetchKnowledge(): Promise<ApiResult<KnowledgeArticle[]>> {
  return safeGet('knowledge', '/knowledge-base', KNOWLEDGE_FALLBACK);
}

export function fetchWorkflows(): Promise<ApiResult<WorkflowSummary[]>> {
  return safeGet('workflows', '/workflows', WORKFLOW_FALLBACK);
}

export function fetchWidgets(): Promise<ApiResult<QuickActionWidget[]>> {
  return safeGet('widgets', '/mobile/widgets', WIDGET_FALLBACK);
}

export function fetchAnalyticsSnapshot(
  params: AnalyticsQueryParams = DEFAULT_ANALYTICS_PARAMS
): Promise<ApiResult<AnalyticsSnapshot>> {
  const query = `dataset=${params.dataset}&timeframe=${params.timeframe}&segment=${params.segment}`;
  const fallback = createAnalyticsSnapshot(params);
  return safeGet(`analytics:${query}`, `/analytics/snapshot?${query}`, fallback);
}
