import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface DesignReviewContextValue {
  enabled: boolean;
  baseline: number;
  showColumns: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
  increaseBaseline: () => void;
  decreaseBaseline: () => void;
  toggleColumns: () => void;
}

const DesignReviewContext = createContext<DesignReviewContextValue | null>(null);

const STORAGE_KEY = 'blackwellen:design-review:v150';
const BASELINE_MIN = 4;
const BASELINE_MAX = 24;
const DEFAULT_BASELINE = 8;

interface PersistedState {
  enabled: boolean;
  baseline: number;
  showColumns: boolean;
}

function readPersistedState(): PersistedState {
  if (typeof window === 'undefined') {
    return { enabled: false, baseline: DEFAULT_BASELINE, showColumns: false };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<PersistedState>;
      return {
        enabled: Boolean(parsed.enabled),
        baseline:
          typeof parsed.baseline === 'number' && parsed.baseline >= BASELINE_MIN && parsed.baseline <= BASELINE_MAX
            ? parsed.baseline
            : DEFAULT_BASELINE,
        showColumns: Boolean(parsed.showColumns)
      };
    }
  } catch (error) {
    console.warn('Unable to read design review state', error);
  }

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.has('designReview')) {
      return { enabled: true, baseline: DEFAULT_BASELINE, showColumns: false };
    }
  }

  return { enabled: false, baseline: DEFAULT_BASELINE, showColumns: false };
}

function persistState(state: PersistedState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to persist design review state', error);
  }
}

export function DesignReviewProvider({ children }: { children: React.ReactNode }) {
  const [{ enabled, baseline, showColumns }, setState] = useState<PersistedState>(readPersistedState);
  const liveMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    persistState({ enabled, baseline, showColumns });
  }, [baseline, enabled, showColumns]);

  const setEnabled = useCallback((value: boolean) => {
    setState((current) => ({ ...current, enabled: value }));
  }, []);

  const toggle = useCallback(() => {
    setState((current) => ({ ...current, enabled: !current.enabled }));
  }, []);

  const increaseBaseline = useCallback(() => {
    setState((current) => ({ ...current, baseline: Math.min(BASELINE_MAX, current.baseline + 2) }));
  }, []);

  const decreaseBaseline = useCallback(() => {
    setState((current) => ({ ...current, baseline: Math.max(BASELINE_MIN, current.baseline - 2) }));
  }, []);

  const toggleColumns = useCallback(() => {
    setState((current) => ({ ...current, showColumns: !current.showColumns }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        toggle();
      }
      if (!event.ctrlKey || !event.shiftKey) {
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        increaseBaseline();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        decreaseBaseline();
      }
      if (event.key.toLowerCase() === 'c') {
        event.preventDefault();
        toggleColumns();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [decreaseBaseline, increaseBaseline, toggle, toggleColumns]);

  useEffect(() => {
    if (!liveMessageRef.current) {
      return;
    }
    liveMessageRef.current.textContent = enabled ? 'Design review tools enabled' : 'Design review tools disabled';
  }, [enabled]);

  const value = useMemo(
    () => ({ enabled, baseline, showColumns, toggle, setEnabled, increaseBaseline, decreaseBaseline, toggleColumns }),
    [baseline, decreaseBaseline, enabled, increaseBaseline, setEnabled, showColumns, toggle, toggleColumns]
  );

  return (
    <DesignReviewContext.Provider value={value}>
      {children}
      <div ref={liveMessageRef} aria-live="polite" className="sr-only" />
    </DesignReviewContext.Provider>
  );
}

export function useDesignReview() {
  const context = useContext(DesignReviewContext);
  if (!context) {
    throw new Error('useDesignReview must be used within a DesignReviewProvider');
  }
  return context;
}
