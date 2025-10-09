import { httpClient } from './httpClient';
import {
  mockDirectory,
  mockKnowledgeBase,
  mockServiceCatalog,
  mockWidgets,
  mockWorkflows
} from './mockDataSource';

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
