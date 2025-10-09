import { addDays, formatISO, subMinutes } from 'date-fns';

import type {
  DirectoryEntry,
  KnowledgeArticle,
  ServiceTemplate,
  Widget,
  WorkflowSummary
} from './intranetApi';

const now = new Date();

export const mockWidgets: Widget[] = [
  {
    id: 'celebrations',
    title: 'Celebrations',
    description: 'Three colleagues celebrate milestones this week. Send a quick note or schedule a lunch.',
    type: 'celebration',
    category: 'people',
    cta: {
      label: 'Open celebrations',
      href: '/directory?filter=celebrations'
    },
    tags: ['engagement', 'milestones'],
    lastUpdated: formatISO(subMinutes(now, 12)),
    refreshIntervalMinutes: 180,
    dataQuality: 'fresh'
  },
  {
    id: 'compliance',
    title: 'Compliance tracker',
    description: 'Policy attestation due for APAC HR. 87% completion, 18 outstanding sign-offs.',
    type: 'todo',
    category: 'compliance',
    metrics: [
      { label: 'Completion', value: '87%' },
      { label: 'Outstanding', value: '18' }
    ],
    cta: {
      label: 'Review attestations',
      href: '/knowledge?policy=apac-hr'
    },
    tags: ['policies', 'risk'],
    lastUpdated: formatISO(subMinutes(now, 8)),
    refreshIntervalMinutes: 60,
    dataQuality: 'fresh',
    insight: 'APAC HR is trending behind EMEA by 6% for this cycle.'
  },
  {
    id: 'insights',
    title: 'Engagement insights',
    description: 'Pulse survey response rate increased 9% week over week with IT showing strongest gains.',
    type: 'insight',
    category: 'analytics',
    metrics: [
      { label: 'Response rate', value: '74%', delta: '+9%' },
      { label: 'Favourability', value: '81%', delta: '+4%' }
    ],
    tags: ['engagement', 'pulse'],
    lastUpdated: formatISO(subMinutes(now, 3)),
    refreshIntervalMinutes: 30,
    dataQuality: 'fresh',
    insight: 'IT sentiment has exceeded 80% for three consecutive weeks.'
  },
  {
    id: 'documents',
    title: 'Document sign-offs',
    description: 'New vendor onboarding checklist ready for approval. Review procurement updates before launch.',
    type: 'document',
    category: 'operations',
    cta: {
      label: 'Open workflow',
      href: '/service-hub?workflow=vendor-onboarding'
    },
    tags: ['procurement', 'workflow'],
    lastUpdated: formatISO(subMinutes(now, 25)),
    refreshIntervalMinutes: 120,
    dataQuality: 'stale'
  },
  {
    id: 'knowledge-spotlight',
    title: 'Knowledge spotlight',
    description: 'Retention policy updates published with guidance for people managers.',
    type: 'news',
    category: 'knowledge',
    cta: {
      label: 'Read policy brief',
      href: '/knowledge?article=kb-002'
    },
    tags: ['knowledge', 'retention'],
    lastUpdated: formatISO(subMinutes(now, 45)),
    refreshIntervalMinutes: 240,
    dataQuality: 'fresh'
  },
  {
    id: 'my-approvals',
    title: 'Tasks & approvals',
    description: 'You have 2 high-SLA approvals pending across service hub and HR workflows.',
    type: 'tasks',
    category: 'operations',
    metrics: [
      { label: 'Due today', value: '2' },
      { label: 'Over SLA', value: '1', delta: '+1' }
    ],
    tags: ['workflow', 'approvals'],
    lastUpdated: formatISO(subMinutes(now, 6)),
    refreshIntervalMinutes: 15,
    dataQuality: 'fresh'
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
  },
  {
    id: 'kb-004',
    title: 'Service request triage playbook',
    summary: 'Queue management, escalation criteria, and SLA recovery tactics for service hub operations.',
    category: 'Operations',
    updatedAt: formatISO(addDays(today, -1)),
    author: 'Nikhil Banerjee',
    status: 'approved',
    tags: ['service hub', 'sla', 'operations']
  },
  {
    id: 'kb-005',
    title: 'Hardware lifecycle standards',
    summary: 'Procurement, imaging, and retirement workflow requirements for laptops and peripherals.',
    category: 'IT',
    updatedAt: formatISO(addDays(today, -7)),
    author: 'Amelia Rhodes',
    status: 'approved',
    tags: ['hardware', 'procurement', 'policy']
  }
];

export const mockWorkflows: WorkflowSummary[] = [
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
  },
  {
    id: 'wf-003',
    name: 'Leave of Absence',
    slaHours: 48,
    queueDepth: 3,
    healthy: true,
    breachedPercent: 2,
    backlogTrend: 'steady',
    avgCompletionHours: 36
  }
];

export const mockServiceCatalog: ServiceTemplate[] = [
  {
    id: 'svc-001',
    name: 'Request Laptop or Peripheral',
    department: 'IT',
    category: 'technology',
    description:
      'Provision a new laptop, monitor, dock, or accessories for employees and contractors with lifecycle tracking.',
    slaHours: 24,
    workflowId: 'wf-001',
    lastUpdated: formatISO(addDays(today, -3)),
    requestVolume: 128,
    priority: 'high',
    tags: ['hardware', 'onboarding', 'devices'],
    knowledgeArticleIds: ['kb-004', 'kb-005'],
    requiredFields: [
      {
        id: 'deviceProfile',
        label: 'Role or device profile',
        type: 'select',
        required: true,
        options: [
          { label: 'Standard knowledge worker', value: 'standard' },
          { label: 'Engineering high performance', value: 'engineering' },
          { label: 'Creative / media production', value: 'creative' }
        ]
      },
      {
        id: 'justification',
        label: 'Business justification',
        type: 'textarea',
        required: true,
        placeholder: 'Explain why the equipment is required and expected usage context.'
      },
      {
        id: 'location',
        label: 'Primary work location',
        type: 'text',
        required: true,
        placeholder: 'e.g. London office, hybrid (2 days), remote - Berlin'
      }
    ],
    attachments: {
      required: false,
      guidance: 'Attach approved cost centre memo if non-standard hardware is needed.',
      acceptedTypes: ['.pdf', '.docx', '.xlsx']
    },
    intakeChecklist: [
      'Confirm employee has completed security induction module within the last 90 days.',
      'Ensure manager has approved the hardware allocation in Workday.',
      'Verify shipping address for remote or hybrid workers.'
    ]
  },
  {
    id: 'svc-002',
    name: 'Onboard New Vendor',
    department: 'Finance',
    category: 'operations',
    description:
      'Kick off procurement onboarding, including due diligence, compliance attestations, and ERP vendor record creation.',
    slaHours: 72,
    workflowId: 'wf-002',
    lastUpdated: formatISO(addDays(today, -5)),
    requestVolume: 34,
    priority: 'medium',
    tags: ['procurement', 'risk', 'finance'],
    knowledgeArticleIds: ['kb-004'],
    requiredFields: [
      {
        id: 'vendorName',
        label: 'Vendor legal name',
        type: 'text',
        required: true,
        placeholder: 'Enter registered legal name'
      },
      {
        id: 'serviceCategory',
        label: 'Service category',
        type: 'select',
        required: true,
        options: [
          { label: 'Software / SaaS', value: 'software' },
          { label: 'Professional services', value: 'services' },
          { label: 'Facilities / logistics', value: 'facilities' },
          { label: 'Equipment', value: 'equipment' }
        ]
      },
      {
        id: 'spendEstimate',
        label: 'Estimated annual spend (USD)',
        type: 'number',
        required: true,
        helperText: 'Used to determine approval routing and risk tier.'
      }
    ],
    attachments: {
      required: true,
      guidance: 'Upload signed statement of work, compliance questionnaires, and tax forms where applicable.',
      acceptedTypes: ['.pdf', '.docx', '.xlsx', '.zip']
    },
    intakeChecklist: [
      'Confirm business owner and cost centre details are documented.',
      'Collect supplier diversity status and risk profile.',
      'Share onboarding timeline with finance and legal partners.'
    ]
  },
  {
    id: 'svc-003',
    name: 'Submit Leave of Absence',
    department: 'HR',
    category: 'people',
    description:
      'Request parental, medical, or personal leave with manager approval and benefits coordination support.',
    slaHours: 48,
    workflowId: 'wf-003',
    lastUpdated: formatISO(addDays(today, -2)),
    requestVolume: 18,
    priority: 'high',
    tags: ['leave', 'benefits', 'hr'],
    knowledgeArticleIds: ['kb-004'],
    requiredFields: [
      {
        id: 'leaveType',
        label: 'Leave type',
        type: 'select',
        required: true,
        options: [
          { label: 'Parental leave', value: 'parental' },
          { label: 'Medical leave', value: 'medical' },
          { label: 'Personal leave', value: 'personal' },
          { label: 'Bereavement', value: 'bereavement' }
        ]
      },
      {
        id: 'startDate',
        label: 'Start date',
        type: 'date',
        required: true
      },
      {
        id: 'endDate',
        label: 'Expected return date',
        type: 'date',
        required: true
      },
      {
        id: 'coveragePlan',
        label: 'Coverage plan details',
        type: 'textarea',
        required: false,
        helperText: 'Outline work handover, interim contacts, and outstanding tasks.'
      }
    ],
    attachments: {
      required: false,
      guidance: 'Attach supporting documentation (e.g. medical certificate) if required by policy.',
      acceptedTypes: ['.pdf', '.jpg', '.png']
    },
    intakeChecklist: [
      'Ensure employee manager is aware of the request and timeline.',
      'Confirm benefits team contact for coordination.',
      'Capture return-to-work preferences and check-in cadence.'
    ]
  },
  {
    id: 'svc-004',
    name: 'Report Workplace Incident',
    department: 'Facilities',
    category: 'operations',
    description:
      'Log a safety, security, or facilities incident to trigger remediation workflows and compliance reporting.',
    slaHours: 8,
    workflowId: 'wf-001',
    lastUpdated: formatISO(addDays(today, -1)),
    requestVolume: 12,
    priority: 'critical',
    tags: ['safety', 'incident', 'facilities'],
    knowledgeArticleIds: ['kb-004'],
    requiredFields: [
      {
        id: 'incidentLocation',
        label: 'Incident location',
        type: 'text',
        required: true,
        placeholder: 'Building / floor / area'
      },
      {
        id: 'incidentDescription',
        label: 'What happened?',
        type: 'textarea',
        required: true,
        placeholder: 'Provide factual description of the incident and immediate actions taken.'
      },
      {
        id: 'injury',
        label: 'Were there injuries?',
        type: 'select',
        required: true,
        options: [
          { label: 'No injuries', value: 'none' },
          { label: 'Minor (first aid)', value: 'minor' },
          { label: 'Serious (medical attention)', value: 'serious' }
        ]
      }
    ],
    attachments: {
      required: true,
      guidance: 'Upload photos, incident reports, or witness statements if available.',
      acceptedTypes: ['.pdf', '.jpg', '.png']
    },
    intakeChecklist: [
      'Capture time and date of incident, including witness names.',
      'Notify facilities on-call manager for immediate response.',
      'Trigger compliance notification if injuries reported.'
    ]
  }
];
