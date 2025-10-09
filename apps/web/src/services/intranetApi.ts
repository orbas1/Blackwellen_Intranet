import { httpClient } from './httpClient';
import { mockDirectory, mockKnowledgeBase, mockWidgets, mockWorkflows } from './mockDataSource';

type ApiResponse<T> = {
  data: T;
  source: 'api' | 'mock';
};

export interface Widget {
  id: string;
  title: string;
  description: string;
  type: 'celebration' | 'todo' | 'document' | 'news' | 'insight';
  metrics?: {
    label: string;
    value: string;
  }[];
  cta?: {
    label: string;
    href: string;
  };
}

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

export async function fetchWidgets(): Promise<ApiResponse<Widget[]>> {
  return safeGet('/widgets', mockWidgets);
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
