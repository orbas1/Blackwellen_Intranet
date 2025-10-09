import http from 'k6/http';
import { check, group, sleep, Trend, Rate } from 'k6';

export const options = {
  scenarios: {
    service_catalog_browse: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 150,
      stages: [
        { target: 20, duration: '2m' },
        { target: 60, duration: '5m' },
        { target: 90, duration: '5m' },
        { target: 0, duration: '1m' },
      ],
    },
    workflow_submission: {
      executor: 'constant-vus',
      vus: 60,
      duration: '7m',
      exec: 'submitWorkflow',
      startTime: '2m',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<600', 'p(99)<1200'],
    http_req_failed: ['rate<0.01'],
    'workflow_submission_duration{type=intake}': ['p(95)<850'],
    'workflow_submission_duration{type=approval}': ['p(95)<1100'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://qa-green.blackwellen.local';
const AUTH_TOKEN = __ENV.AUTH_TOKEN;

const workflowTrend = new Trend('workflow_submission_duration', true);
const failedApprovals = new Rate('workflow_approval_failures');

function authHeaders() {
  if (!AUTH_TOKEN) {
    throw new Error('AUTH_TOKEN environment variable is required');
  }
  return {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
}

export default function browseCatalog() {
  group('service-catalog', () => {
    const res = http.get(`${BASE_URL}/api/service-hub/catalog`, authHeaders());
    check(res, {
      'catalog response is 200': (r) => r.status === 200,
      'catalog payload contains SLA field': (r) => r.json().data.every((item) => item.slaMinutes),
    });
    sleep(1);

    const detailRes = http.get(`${BASE_URL}/api/service-hub/catalog/automation`, authHeaders());
    check(detailRes, {
      'detail response is 200': (r) => r.status === 200,
      'detail payload exposes checklist': (r) => r.json().data.checklist.length > 0,
    });
  });
}

export function submitWorkflow() {
  const payload = JSON.stringify({
    requestType: 'it-hardware',
    summary: 'Bulk laptop provisioning for new cohort',
    justification: 'Wave 3 onboarding',
    attachments: [
      {
        name: 'hardware-plan.xlsx',
        url: 'https://storage.blackwellen.local/mock/hardware-plan.xlsx',
      },
    ],
    checklist: [
      { id: 'security-clearance', status: 'confirmed' },
      { id: 'manager-approval', status: 'confirmed' },
    ],
  });

  const start = Date.now();
  const res = http.post(`${BASE_URL}/api/service-hub/requests`, payload, authHeaders());
  const duration = Date.now() - start;
  workflowTrend.add(duration, { type: 'intake' });

  check(res, {
    'request submitted successfully': (r) => r.status === 202,
    'request id returned': (r) => !!r.json().data.requestId,
  }) || failedApprovals.add(1);

  const approvalPayload = JSON.stringify({
    approval: {
      requestId: res.json().data.requestId,
      approvedBy: 'qa-automation@blackwellen.com',
      notes: 'Auto-approved for load test scenario',
    },
  });

  const approvalStart = Date.now();
  const approvalRes = http.post(`${BASE_URL}/api/service-hub/requests/${res.json().data.requestId}/approve`, approvalPayload, authHeaders());
  const approvalDuration = Date.now() - approvalStart;
  workflowTrend.add(approvalDuration, { type: 'approval' });

  check(approvalRes, {
    'approval accepted': (r) => r.status === 200,
    'approval returns workflow status': (r) => r.json().data.status === 'APPROVED',
  }) || failedApprovals.add(1);

  sleep(0.5);
}
