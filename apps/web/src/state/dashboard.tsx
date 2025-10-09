import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

export type DashboardDensity = 'comfortable' | 'compact';
export type DataViewMode = 'live' | 'cached';

export type DashboardQuickLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
};

type DashboardState = {
  layout: string[];
  hiddenWidgets: string[];
  density: DashboardDensity;
  dataViewMode: DataViewMode;
  quickLinkIds: string[];
  version: number;
};

type DashboardAction =
  | { type: 'sync-widgets'; widgetIds: string[] }
  | { type: 'set-layout'; layout: string[] }
  | { type: 'toggle-widget'; widgetId: string; hidden?: boolean }
  | { type: 'set-density'; density: DashboardDensity }
  | { type: 'set-data-view-mode'; mode: DataViewMode }
  | { type: 'toggle-quick-link'; quickLinkId: string };

type DashboardContextValue = {
  layout: string[];
  density: DashboardDensity;
  dataViewMode: DataViewMode;
  hiddenWidgets: string[];
  quickLinks: DashboardQuickLink[];
  pinnedQuickLinks: DashboardQuickLink[];
  reorder: (nextLayout: string[]) => void;
  toggleWidgetVisibility: (widgetId: string, hidden?: boolean) => void;
  setDensity: (density: DashboardDensity) => void;
  setDataViewMode: (mode: DataViewMode) => void;
  toggleQuickLink: (quickLinkId: string) => void;
  syncWidgets: (widgetIds: string[]) => void;
};

const STORAGE_KEY = 'blackwellen:dashboard:v1';
const DASHBOARD_STATE_VERSION = 1;

const QUICK_LINK_CATALOG: DashboardQuickLink[] = [
  {
    id: 'launch-service-request',
    label: 'Launch service request',
    description: 'Open the service intake wizard with SLA and routing guidance.',
    href: '/service-hub?intent=new-request',
    icon: 'spark'
  },
  {
    id: 'book-leave',
    label: 'Book time off',
    description: 'Submit a leave of absence request to HR for approval.',
    href: '/service-hub?workflow=leave-of-absence',
    icon: 'calendar'
  },
  {
    id: 'expense-claim',
    label: 'Submit expense',
    description: 'Upload receipts and route expenses to Finance.',
    href: '/service-hub?workflow=expense-claim',
    icon: 'receipt'
  },
  {
    id: 'policy-library',
    label: 'Policy library',
    description: 'Review the latest compliance policies and attestation deadlines.',
    href: '/knowledge?category=Compliance',
    icon: 'shield'
  },
  {
    id: 'org-explorer',
    label: 'Browse organisation',
    description: 'Jump straight to the directory with filters and reporting lines.',
    href: '/directory',
    icon: 'network'
  }
];

const DEFAULT_STATE: DashboardState = {
  layout: [],
  hiddenWidgets: [],
  density: 'comfortable',
  dataViewMode: 'live',
  quickLinkIds: ['launch-service-request', 'policy-library', 'org-explorer'],
  version: DASHBOARD_STATE_VERSION
};

function readState(): DashboardState {
  if (typeof window === 'undefined') {
    return DEFAULT_STATE;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_STATE;
    }
    const parsed = JSON.parse(stored) as DashboardState;
    if (parsed.version !== DASHBOARD_STATE_VERSION) {
      return { ...DEFAULT_STATE };
    }

    return {
      ...DEFAULT_STATE,
      ...parsed,
      layout: Array.isArray(parsed.layout) ? parsed.layout : DEFAULT_STATE.layout,
      hiddenWidgets: Array.isArray(parsed.hiddenWidgets) ? parsed.hiddenWidgets : DEFAULT_STATE.hiddenWidgets,
      quickLinkIds: Array.isArray(parsed.quickLinkIds) ? parsed.quickLinkIds : DEFAULT_STATE.quickLinkIds
    };
  } catch (error) {
    console.warn('Unable to read dashboard state', error);
    return DEFAULT_STATE;
  }
}

function persistState(state: DashboardState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to persist dashboard state', error);
  }
}

function reducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'sync-widgets': {
      const deduped = Array.from(new Set(action.widgetIds));
      const layout = state.layout.filter((id) => deduped.includes(id));
      deduped.forEach((id) => {
        if (!layout.includes(id)) {
          layout.push(id);
        }
      });
      const hiddenWidgets = state.hiddenWidgets.filter((id) => deduped.includes(id));
      return { ...state, layout, hiddenWidgets };
    }
    case 'set-layout': {
      const nextLayout = action.layout.filter((id) => id);
      return { ...state, layout: nextLayout };
    }
    case 'toggle-widget': {
      const shouldHide =
        typeof action.hidden === 'boolean'
          ? action.hidden
          : !state.hiddenWidgets.includes(action.widgetId);
      if (shouldHide) {
        if (state.hiddenWidgets.includes(action.widgetId)) {
          return state;
        }
        return { ...state, hiddenWidgets: [...state.hiddenWidgets, action.widgetId] };
      }
      return {
        ...state,
        hiddenWidgets: state.hiddenWidgets.filter((id) => id !== action.widgetId)
      };
    }
    case 'set-density': {
      if (state.density === action.density) {
        return state;
      }
      return { ...state, density: action.density };
    }
    case 'set-data-view-mode': {
      if (state.dataViewMode === action.mode) {
        return state;
      }
      return { ...state, dataViewMode: action.mode };
    }
    case 'toggle-quick-link': {
      if (state.quickLinkIds.includes(action.quickLinkId)) {
        return {
          ...state,
          quickLinkIds: state.quickLinkIds.filter((id) => id !== action.quickLinkId)
        };
      }
      return {
        ...state,
        quickLinkIds: [...state.quickLinkIds, action.quickLinkId]
      };
    }
    default:
      return state;
  }
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const syncWidgets = useCallback(
    (widgetIds: string[]) => dispatch({ type: 'sync-widgets', widgetIds }),
    []
  );

  const reorder = useCallback((layout: string[]) => dispatch({ type: 'set-layout', layout }), []);

  const toggleWidgetVisibility = useCallback(
    (widgetId: string, hidden?: boolean) => dispatch({ type: 'toggle-widget', widgetId, hidden }),
    []
  );

  const setDensity = useCallback((density: DashboardDensity) => dispatch({ type: 'set-density', density }), []);

  const setDataViewMode = useCallback((mode: DataViewMode) => dispatch({ type: 'set-data-view-mode', mode }), []);

  const toggleQuickLink = useCallback(
    (quickLinkId: string) => dispatch({ type: 'toggle-quick-link', quickLinkId }),
    []
  );

  const quickLinks = useMemo(() => QUICK_LINK_CATALOG, []);

  const pinnedQuickLinks = useMemo(
    () => quickLinks.filter((link) => state.quickLinkIds.includes(link.id)),
    [quickLinks, state.quickLinkIds]
  );

  const value = useMemo<DashboardContextValue>(
    () => ({
      layout: state.layout,
      density: state.density,
      dataViewMode: state.dataViewMode,
      hiddenWidgets: state.hiddenWidgets,
      quickLinks,
      pinnedQuickLinks,
      reorder,
      toggleWidgetVisibility,
      setDensity,
      setDataViewMode,
      toggleQuickLink,
      syncWidgets
    }),
    [
      state.layout,
      state.density,
      state.dataViewMode,
      state.hiddenWidgets,
      quickLinks,
      pinnedQuickLinks,
      reorder,
      toggleWidgetVisibility,
      setDensity,
      setDataViewMode,
      toggleQuickLink,
      syncWidgets
    ]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}

export function getQuickLinkCatalog() {
  return QUICK_LINK_CATALOG.slice();
}
