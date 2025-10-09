type TelemetryEvent = {
  id: string;
  name: string;
  occurredAt: string;
  attributes: Record<string, unknown>;
};

const TELEMETRY_ENDPOINT =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_TELEMETRY_ENDPOINT
    ? import.meta.env.VITE_TELEMETRY_ENDPOINT
    : '/api/telemetry/events';

const queue: TelemetryEvent[] = [];
let flushHandle: number | null = null;

function scheduleFlush() {
  if (typeof window === 'undefined') {
    return;
  }
  if (flushHandle) {
    return;
  }
  flushHandle = window.setTimeout(() => {
    flushHandle = null;
    void flushQueue();
  }, 1500);
}

async function flushQueue() {
  if (queue.length === 0 || typeof window === 'undefined') {
    return;
  }

  const events = queue.splice(0, queue.length);
  const payload = JSON.stringify({ events });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TELEMETRY_ENDPOINT, payload);
      return;
    }

    const response = await fetch(TELEMETRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    });

    if (!response.ok) {
      console.warn('Telemetry delivery failed', response.status);
    }
  } catch (error) {
    console.warn('Telemetry delivery error', error);
  }
}

export function trackEvent(name: string, attributes: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    name,
    occurredAt: new Date().toISOString(),
    attributes: {
      ...attributes,
      url: window.location.pathname,
      userAgent: navigator.userAgent
    }
  };

  queue.push(event);

  if (queue.length >= 10) {
    void flushQueue();
    return;
  }

  scheduleFlush();
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (queue.length > 0) {
      try {
        const payload = JSON.stringify({ events: queue.splice(0, queue.length) });
        navigator.sendBeacon(TELEMETRY_ENDPOINT, payload);
      } catch (error) {
        console.warn('Telemetry unload delivery error', error);
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && queue.length > 0) {
      void flushQueue();
    }
  });
}
