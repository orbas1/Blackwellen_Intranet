import { httpClient } from './httpClient';
import {
  mockDirectory,
  mockKnowledgeBase,
  mockServiceCatalog,
  mockWidgets,
  mockWorkflows
} from './mockDataSource';
import { createMockAnalyticsSnapshot, mockAnalyticsReportSchedules } from './mockAnalytics';

type ApiResponse<T> = {
  data: T;
  source: 'api' | 'mock';
};

export interface Widget {
  id: string;
  title: string;
  description: string;
  type: 'celebration' | 'todo' | 'document' | 'news' | 'insight' | 'kpi' | 'tasks';
  category: 'people' | 'compliance' | 'analytics' | 'operations' | 'knowledge' | 'ai';
  metrics?: {
    label: string;
    value: string;
    delta?: string;
  }[];
  tags?: string[];
  cta?: {
    label: string;
    href: string;
  };
  lastUpdated: string;
  refreshIntervalMinutes: number;
  dataQuality: 'fresh' | 'stale' | 'offline';
  insight?: string;
}

type FetchWidgetsOptions = {
  viewMode?: 'live' | 'cached';
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
  managerId?: string;
  bio?: string;
  timeZone?: string;
  workingHours?: string;
  manager?: { id: string; name: string; role: string };
  directReports?: { id: string; name: string; role: string }[];
  currentProjects?: string[];
  supportHours?: { day: string; hours: string }[];
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

export interface ServiceTemplateFieldOption {
  label: string;
  value: string;
}

export interface ServiceTemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email';
  required: boolean;
  placeholder?: string;
  helperText?: string;
  options?: ServiceTemplateFieldOption[];
}

export interface ServiceTemplate {
  id: string;
  name: string;
  department: 'IT' | 'HR' | 'Finance' | 'Operations' | 'Facilities';
  category: 'access' | 'people' | 'finance' | 'technology' | 'operations';
  description: string;
  slaHours: number;
  workflowId: string;
  lastUpdated: string;
  requestVolume: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  knowledgeArticleIds: string[];
  requiredFields: ServiceTemplateField[];
  attachments: {
    required: boolean;
    guidance: string;
    acceptedTypes: string[];
  };
  intakeChecklist: string[];
}

export interface ServiceRequestPayload {
  serviceId: string;
  summary: string;
  urgency: 'low' | 'normal' | 'high' | 'critical';
  dueDate?: string;
  context?: string;
  dynamicFields: Record<string, string>;
  attachments: { name: string; link: string }[];
  notifyManager: boolean;
}

export interface ServiceRequestResponse {
  requestId: string;
  etaHours: number;
  status: 'submitted' | 'queued';
}

export type AnalyticsDatasetKey = 'engagement' | 'service' | 'finance';
export type AnalyticsTimeframe = '7d' | '30d' | '90d';
export type AnalyticsSegment = 'global' | 'emea' | 'apac' | 'amer';

export interface AnalyticsDataset {
  key: AnalyticsDatasetKey;
  name: string;
  description: string;
}

export interface AnalyticsTrendPoint {
  timestamp: string;
  value: number;
}

export interface AnalyticsKpi {
  id: string;
  label: string;
  unit: 'percentage' | 'count' | 'currency' | 'duration';
  value: number;
  delta: number;
  comparisonPeriod: string;
  target?: number;
  owner: string;
  status: 'exceeding' | 'on-track' | 'watch' | 'at-risk';
  narrative: string;
  trend: AnalyticsTrendPoint[];
  precision: number;
}

export interface AnalyticsAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  detectedAt: string;
  acknowledgedAt?: string;
  description: string;
  recommendedAction: string;
  owner: string;
  metricIds: string[];
  impact: string;
  slaHours: number;
  impactedSegments: AnalyticsSegment[];
}

export interface AnalyticsReportSchedule {
  id: string;
  name: string;
  cadence: 'daily' | 'weekly' | 'monthly';
  deliveryFormat: 'email' | 'slack' | 'teams';
  recipients: string[];
  filters: AnalyticsQueryParams;
  lastRunAt: string;
  nextRunAt: string;
  lastRunStatus: 'on_time' | 'delayed' | 'failed';
  enabled: boolean;
  owner: string;
}

export interface AnalyticsSecurityControl {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  owner: string;
  lastReviewed: string;
  description: string;
  requiredActions: string[];
  coverage: number;
}

export interface MobileSecurityPosture {
  managedDevices: number;
  compliantDevices: number;
  pendingRemediations: number;
  blockedDevices: number;
  lastAudit: string;
  pushOptInRate: number;
  crashFreeSessions: number;
  mfaCoverage: number;
  comment: string;
}

export interface AnalyticsSnapshot {
  availableDatasets: AnalyticsDataset[];
  availableSegments: AnalyticsSegment[];
  availableTimeframes: AnalyticsTimeframe[];
  dataset: AnalyticsDataset;
  timeframe: AnalyticsTimeframe;
  segment: AnalyticsSegment;
  lastRefreshed: string;
  freshnessLagMinutes: number;
  dataSource: 'warehouse' | 'stream';
  kpis: AnalyticsKpi[];
  alerts: AnalyticsAlert[];
  schedules: AnalyticsReportSchedule[];
  aiInsights: string[];
  securityControls: AnalyticsSecurityControl[];
  mobileSecurity: MobileSecurityPosture;
  dataQuality: {
    completeness: number;
    anomalyCount: number;
    coverageNotes: string;
  };
  storyHighlights: {
    id: string;
    title: string;
    summary: string;
    metricIds: string[];
  }[];
}

export interface AnalyticsQueryParams {
  dataset: AnalyticsDatasetKey;
  timeframe: AnalyticsTimeframe;
  segment: AnalyticsSegment;
}

export interface AnalyticsAssistantRecommendation {
  id: string;
  statement: string;
  impact: 'high' | 'medium' | 'low';
  owner: string;
}

export interface AnalyticsAssistantResponse {
  summary: string;
  highlights: string[];
  recommendations: AnalyticsAssistantRecommendation[];
  confidence: number;
  references: { type: 'kpi' | 'alert' | 'schedule'; id: string }[];
}

export interface UpdateAnalyticsSchedulePayload {
  scheduleId: string;
  enabled?: boolean;
  recipients?: string[];
  cadence?: 'daily' | 'weekly' | 'monthly';
  deliveryFormat?: 'email' | 'slack' | 'teams';
}

export interface AnalyticsAlertAcknowledgement {
  alertId: string;
  acknowledgedAt: string;
  status: 'acknowledged';
}

async function safeGet<T>(path: string, fallback: T): Promise<ApiResponse<T>> {
  try {
    const response = await httpClient.get<T>(path);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.warn(`Falling back to mock data for ${path}`, error);
    return { data: fallback, source: 'mock' };
  }
}

export async function fetchWidgets(options?: FetchWidgetsOptions): Promise<ApiResponse<Widget[]>> {
  const viewMode = options?.viewMode ?? 'live';
  const query = viewMode === 'cached' ? '?mode=cached' : '';
  const fallback =
    viewMode === 'cached'
      ? mockWidgets.map((widget) => ({
          ...widget,
          dataQuality: widget.dataQuality === 'fresh' ? 'stale' : widget.dataQuality
        }))
      : mockWidgets;
  return safeGet(`/widgets${query}`, fallback);
}

export async function fetchDirectory(query?: string): Promise<ApiResponse<DirectoryEntry[]>> {
  if (!query) {
    return safeGet('/directory', mockDirectory);
  }

  const normalizedQuery = query.toLowerCase();
  const filtered = mockDirectory.filter((entry) =>
    [entry.name, entry.department, entry.role, entry.location]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  );
  return safeGet(`/directory?query=${encodeURIComponent(query)}`, filtered);
}

export async function fetchDirectoryProfile(id: string): Promise<ApiResponse<DirectoryEntry | undefined>> {
  const fallback = mockDirectory.find((entry) => entry.id === id);
  return safeGet(`/directory/${id}`, fallback);
}

export async function fetchKnowledge(): Promise<ApiResponse<KnowledgeArticle[]>> {
  return safeGet('/knowledge-base', mockKnowledgeBase);
}

export async function fetchWorkflows(): Promise<ApiResponse<WorkflowSummary[]>> {
  return safeGet('/workflows', mockWorkflows);
}

export async function fetchServiceCatalog(): Promise<ApiResponse<ServiceTemplate[]>> {
  return safeGet('/service-catalog', mockServiceCatalog);
}

export async function submitServiceRequest(
  payload: ServiceRequestPayload
): Promise<ApiResponse<ServiceRequestResponse>> {
  try {
    const response = await httpClient.post<ServiceRequestResponse>('/service-requests', payload);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.warn('Falling back to mock service request submission', error);
    return {
      data: {
        requestId: `mock-${Date.now()}`,
        etaHours: payload.urgency === 'critical' ? 4 : payload.urgency === 'high' ? 12 : 24,
        status: 'queued'
      },
      source: 'mock'
    };
  }
}

export async function fetchAnalyticsSnapshot(
  params: AnalyticsQueryParams
): Promise<ApiResponse<AnalyticsSnapshot>> {
  const query = new URLSearchParams({
    dataset: params.dataset,
    timeframe: params.timeframe,
    segment: params.segment
  }).toString();
  const fallback = createMockAnalyticsSnapshot(params);
  return safeGet(`/analytics/snapshot?${query}`, fallback);
}

export async function acknowledgeAnalyticsAlert(
  alertId: string
): Promise<ApiResponse<AnalyticsAlertAcknowledgement>> {
  try {
    const response = await httpClient.post<AnalyticsAlertAcknowledgement>(
      `/analytics/alerts/${alertId}/acknowledge`
    );
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.warn('Falling back to mock analytics alert acknowledgement', error);
    return {
      data: {
        alertId,
        acknowledgedAt: new Date().toISOString(),
        status: 'acknowledged'
      },
      source: 'mock'
    };
  }
}

export async function updateAnalyticsReportSchedule(
  payload: UpdateAnalyticsSchedulePayload
): Promise<ApiResponse<AnalyticsReportSchedule>> {
  try {
    const response = await httpClient.patch<AnalyticsReportSchedule>(
      `/analytics/schedules/${payload.scheduleId}`,
      payload
    );
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.warn('Falling back to mock analytics schedule update', error);
    const baseline = mockAnalyticsReportSchedules.find((schedule) => schedule.id === payload.scheduleId);
    const template: AnalyticsReportSchedule =
      baseline ?? {
        id: payload.scheduleId,
        name: 'Ad-hoc analytics schedule',
        cadence: payload.cadence ?? 'weekly',
        deliveryFormat: payload.deliveryFormat ?? 'email',
        recipients: payload.recipients ?? ['analytics@blackwellen.com'],
        filters: {
          dataset: 'engagement',
          timeframe: '30d',
          segment: 'global'
        },
        lastRunAt: new Date().toISOString(),
        nextRunAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        lastRunStatus: 'on_time',
        enabled: payload.enabled ?? true,
        owner: 'Analytics Platform'
      };

    const updated: AnalyticsReportSchedule = {
      ...template,
      cadence: payload.cadence ?? template.cadence,
      deliveryFormat: payload.deliveryFormat ?? template.deliveryFormat,
      recipients: payload.recipients ?? template.recipients,
      enabled: payload.enabled ?? template.enabled
    };

    return { data: updated, source: 'mock' };
  }
}
