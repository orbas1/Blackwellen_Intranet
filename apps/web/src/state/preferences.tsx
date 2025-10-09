import { Dispatch, createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

type PreferenceState = {
  pinnedEmployees: string[];
};

type PreferenceAction =
  | { type: 'pin-employee'; id: string }
  | { type: 'unpin-employee'; id: string };

const PREFERENCES_KEY = 'blackwellen.preferences';

function loadInitialState(): PreferenceState {
  if (typeof window === 'undefined') {
    return { pinnedEmployees: [] };
  }

  try {
    const stored = window.localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PreferenceState;
      if (Array.isArray(parsed.pinnedEmployees)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Unable to read preferences', error);
  }
  return { pinnedEmployees: [] };
}

function reducer(state: PreferenceState, action: PreferenceAction): PreferenceState {
  switch (action.type) {
    case 'pin-employee': {
      if (state.pinnedEmployees.includes(action.id)) {
        return state;
      }
      const next = { ...state, pinnedEmployees: [...state.pinnedEmployees, action.id] };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
      }
      return next;
    }
    case 'unpin-employee': {
      const next = {
        ...state,
        pinnedEmployees: state.pinnedEmployees.filter((id) => id !== action.id)
      };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
      }
      return next;
    }
    default:
      return state;
  }
}

const PreferenceContext = createContext<{ state: PreferenceState; dispatch: Dispatch<PreferenceAction> } | null>(null);

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferenceProvider');
  }
  return context;
}
