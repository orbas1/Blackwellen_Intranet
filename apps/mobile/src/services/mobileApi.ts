import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
