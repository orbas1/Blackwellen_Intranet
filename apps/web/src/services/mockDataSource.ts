import { addDays, formatISO } from 'date-fns';

import type { DirectoryEntry, KnowledgeArticle, Widget, WorkflowSummary } from './intranetApi';

export const mockWidgets: Widget[] = [
  {
    id: 'celebrations',
    title: 'Celebrations',
    description: 'Three colleagues celebrate milestones this week. Send a quick note or schedule a lunch.',
    type: 'celebration',
    cta: {
      label: 'Open celebrations',
      href: '/directory?filter=celebrations'
    }
  },
  {
    id: 'compliance',
    title: 'Compliance tracker',
    description: 'Policy attestation due for APAC HR. 87% completion, 18 outstanding sign-offs.',
    type: 'todo',
    metrics: [
      { label: 'Completion', value: '87%' },
      { label: 'Outstanding', value: '18' }
    ],
    cta: {
      label: 'Review attestations',
      href: '/knowledge?policy=apac-hr'
    }
  },
  {
    id: 'insights',
    title: 'Engagement insights',
    description: 'Pulse survey response rate increased 9% week over week with IT showing strongest gains.',
    type: 'insight',
    metrics: [
      { label: 'Response rate', value: '74%' },
      { label: 'Trend', value: '+9%' }
    ]
  },
  {
    id: 'documents',
    title: 'Document sign-offs',
    description: 'New vendor onboarding checklist ready for approval. Review procurement updates before launch.',
    type: 'document',
    cta: {
      label: 'Open workflow',
      href: '/service-hub?workflow=vendor-onboarding'
    }
  }
];

export const mockDirectory: DirectoryEntry[] = [
  {
    id: 'u-100',
    name: 'Danielle Rivers',
    role: 'Head of People Operations',
    department: 'People',
    location: 'London',
    email: 'danielle.rivers@blackwellen.com',
    phone: '+44 20 3996 1000',
    skills: ['People Strategy', 'Learning & Development', 'HR Analytics'],
    bio: 'Leads global people operations, harmonising policy, analytics, and employee listening to shape resilient teams.',
    timeZone: 'GMT+1',
    workingHours: '08:30 – 17:30',
    currentProjects: ['FY25 workforce planning', 'Leadership capability academy'],
    directReports: [
      { id: 'u-101', name: 'Leo Ng', role: 'Director of Digital Workplace' },
      { id: 'u-102', name: 'Maya Alvarez', role: 'Employee Experience Lead' }
    ],
    supportHours: [
      { day: 'Monday', hours: '08:30 – 17:30' },
      { day: 'Wednesday', hours: '08:30 – 17:30' }
    ]
  },
  {
    id: 'u-101',
    name: 'Leo Ng',
    role: 'Director of Digital Workplace',
    department: 'Technology',
    location: 'Singapore',
    email: 'leo.ng@blackwellen.com',
    phone: '+65 6321 4455',
    skills: ['Product Strategy', 'Automation', 'Analytics'],
    managerId: 'u-100',
    bio: 'Owns the intranet, automation, and collaboration strategy with a focus on adoption metrics and operational resilience.',
    timeZone: 'GMT+8',
    workingHours: '09:00 – 18:00',
    manager: { id: 'u-100', name: 'Danielle Rivers', role: 'Head of People Operations' },
    currentProjects: ['Adaptive home rollout', 'Self-service analytics enablement'],
    directReports: [{ id: 'u-103', name: 'Ravi Patel', role: 'Automation Lead' }],
    supportHours: [
      { day: 'Tuesday', hours: '09:00 – 18:00' },
      { day: 'Thursday', hours: '10:00 – 19:00' }
    ]
  },
  {
    id: 'u-102',
    name: 'Maya Alvarez',
    role: 'Employee Experience Lead',
    department: 'Communications',
    location: 'Toronto',
    email: 'maya.alvarez@blackwellen.com',
    phone: '+1 416 555 0151',
    skills: ['Internal Comms', 'Storytelling', 'Brand'],
    managerId: 'u-100',
    bio: 'Designs narrative, change, and education programmes for all product launches with rigorous measurement frameworks.',
    timeZone: 'GMT-4',
    workingHours: '09:00 – 17:00',
    manager: { id: 'u-100', name: 'Danielle Rivers', role: 'Head of People Operations' },
    currentProjects: ['Knowledge base relaunch', 'Service hub change communications'],
    directReports: [
      { id: 'u-104', name: 'Priya Shah', role: 'Internal Communications Partner' },
      { id: 'u-105', name: 'Chris Wallace', role: 'Learning Designer' }
    ],
    supportHours: [
      { day: 'Monday', hours: '09:00 – 17:00' },
      { day: 'Friday', hours: '09:00 – 15:00' }
    ]
  },
  {
    id: 'u-103',
    name: 'Ravi Patel',
    role: 'Automation Lead',
    department: 'Technology',
    location: 'Singapore',
    email: 'ravi.patel@blackwellen.com',
    phone: '+65 6321 4456',
    skills: ['ServiceNow', 'Integration', 'DevOps'],
    managerId: 'u-101',
    manager: { id: 'u-101', name: 'Leo Ng', role: 'Director of Digital Workplace' },
    bio: 'Implements automation blueprints, telemetry guardrails, and resilient workflow orchestration for the service hub.',
    timeZone: 'GMT+8',
    workingHours: '10:00 – 19:00',
    currentProjects: ['Workflow telemetry rollout', 'Incident response automation'],
    supportHours: [
      { day: 'Wednesday', hours: '10:00 – 19:00' },
      { day: 'Saturday', hours: '09:00 – 13:00' }
    ]
  },
  {
    id: 'u-104',
    name: 'Priya Shah',
    role: 'Internal Communications Partner',
    department: 'Communications',
    location: 'Toronto',
    email: 'priya.shah@blackwellen.com',
    phone: '+1 416 555 0152',
    skills: ['Campaigns', 'Copywriting', 'Analytics'],
    managerId: 'u-102',
    manager: { id: 'u-102', name: 'Maya Alvarez', role: 'Employee Experience Lead' },
    bio: 'Leads global comms campaigns, produces analytics dashboards, and aligns tone across digital channels.',
    timeZone: 'GMT-4',
    workingHours: '08:30 – 16:30',
    currentProjects: ['Adaptive home launch kit'],
    supportHours: [{ day: 'Thursday', hours: '08:30 – 16:30' }]
  },
  {
    id: 'u-105',
    name: 'Chris Wallace',
    role: 'Learning Designer',
    department: 'Communications',
    location: 'Remote - Berlin',
    email: 'chris.wallace@blackwellen.com',
    phone: '+49 30 5557 0800',
    skills: ['Learning Science', 'Video Production', 'Instructional Design'],
    managerId: 'u-102',
    manager: { id: 'u-102', name: 'Maya Alvarez', role: 'Employee Experience Lead' },
    bio: 'Designs blended learning experiences, orchestrates knowledge capture, and curates product onboarding journeys.',
    timeZone: 'GMT+2',
    workingHours: '10:00 – 18:00',
    currentProjects: ['Service hub academy'],
    supportHours: [{ day: 'Tuesday', hours: '10:00 – 18:00' }]
  }
];

const today = new Date();

export const mockKnowledgeBase: KnowledgeArticle[] = [
  {
    id: 'kb-001',
    title: 'Adaptive home widget governance',
    summary: 'Guidelines for targeting, analytics, and experimentation within the adaptive home experience.',
    category: 'Digital Workplace',
    updatedAt: formatISO(addDays(today, -2)),
    author: 'Leo Ng',
    status: 'approved',
    tags: ['governance', 'widgets', 'analytics']
  },
  {
    id: 'kb-002',
    title: 'Knowledge retention and attestation playbook',
    summary: 'Step-by-step policy for quarterly attestation, versioning, and acknowledgement flows.',
    category: 'Compliance',
    updatedAt: formatISO(addDays(today, -12)),
    author: 'Danielle Rivers',
    status: 'approved',
    tags: ['compliance', 'policies']
  },
  {
    id: 'kb-003',
    title: 'Service hub localisation patterns',
    summary: 'String management, accessibility, and translation workflow for service hub expansion.',
    category: 'Service Hub',
    updatedAt: formatISO(addDays(today, -5)),
    author: 'Maya Alvarez',
    status: 'draft',
    tags: ['localisation', 'ux']
  }
];

export const mockWorkflows: WorkflowSummary[] = [
  {
    id: 'wf-001',
    name: 'IT Hardware Request',
    slaHours: 24,
    queueDepth: 6,
    healthy: true
  },
  {
    id: 'wf-002',
    name: 'Vendor Onboarding',
    slaHours: 72,
    queueDepth: 14,
    healthy: false
  },
  {
    id: 'wf-003',
    name: 'Leave of Absence',
    slaHours: 48,
    queueDepth: 3,
    healthy: true
  }
];
