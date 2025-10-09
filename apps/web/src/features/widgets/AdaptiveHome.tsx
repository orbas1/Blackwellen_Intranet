import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { fetchWidgets, Widget } from '../../services/intranetApi';
import { useDashboard } from '../../state/dashboard';
import { trackEvent } from '../../services/telemetry';
import { QuickLinksPanel } from './QuickLinksPanel';
import { WidgetGrid } from './WidgetGrid';
import { WidgetPreferencesDrawer } from './WidgetPreferencesDrawer';
import styles from './adaptiveHome.module.css';

export function AdaptiveHome() {
  const queryClient = useQueryClient();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const {
    layout,
    hiddenWidgets,
    density,
    dataViewMode,
    quickLinks,
    pinnedQuickLinks,
    reorder,
    toggleWidgetVisibility,
    setDensity,
    setDataViewMode,
    toggleQuickLink,
    syncWidgets
  } = useDashboard();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['widgets', dataViewMode],
    queryFn: () => fetchWidgets({ viewMode: dataViewMode }),
    staleTime: dataViewMode === 'live' ? 30_000 : 5 * 60_000,
    refetchInterval: dataViewMode === 'live' ? 60_000 : false
  });

  useEffect(() => {
    if (data?.data) {
      syncWidgets(data.data.map((widget) => widget.id));
      trackEvent('dashboard.widgets.loaded', {
        source: data.source,
        widgetCount: data.data.length
      });
    }
  }, [data, syncWidgets]);

  useEffect(() => {
    trackEvent('dashboard.viewed', {
      density,
      dataViewMode
    });
  }, [density, dataViewMode]);

  const allWidgets = useMemo(() => data?.data ?? [], [data]);

  const orderedWidgets = useMemo(() => {
    const map = new Map(allWidgets.map((widget) => [widget.id, widget]));
    const inLayout: Widget[] = layout
      .map((id) => map.get(id))
      .filter((widget): widget is Widget => Boolean(widget));
    const remaining = allWidgets.filter((widget) => !layout.includes(widget.id));
    return [...inLayout, ...remaining];
  }, [allWidgets, layout]);

  const visibleWidgets = useMemo(
    () => orderedWidgets.filter((widget) => !hiddenWidgets.includes(widget.id)),
    [orderedWidgets, hiddenWidgets]
  );

  const handleReorder = (nextOrder: string[]) => {
    reorder(nextOrder);
    trackEvent('dashboard.widgets.reordered', { order: nextOrder });
  };

  const handleRefresh = (widgetId: string) => {
    trackEvent('dashboard.widget.refresh', { widgetId });
    void queryClient.invalidateQueries({ queryKey: ['widgets', dataViewMode] });
  };

  const handleConfigure = (widgetId: string) => {
    setIsPreferencesOpen(true);
    trackEvent('dashboard.widget.configure', { widgetId });
  };

  const handleHide = (widgetId: string) => {
    toggleWidgetVisibility(widgetId, true);
    trackEvent('dashboard.widget.hidden', { widgetId });
  };

  if (isLoading) {
    return <div className={styles.state}>Preparing your adaptive experience…</div>;
  }

  if (error) {
    return <div className={clsx(styles.state, styles.error)}>We couldn’t load widgets. Try refreshing the page.</div>;
  }

  const dataSourceLabel = data?.source === 'api' ? 'Live services' : 'Offline snapshot';

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Adaptive home</h1>
        <p>
          Personalised entry point for the Blackwellen intranet, combining workflow tasks, knowledge, analytics, and
          recognition into a single, role-aware view.
        </p>
        <div className={styles.toolbar}>
          <button
            type="button"
            onClick={() => {
              setIsPreferencesOpen(true);
              trackEvent('dashboard.preferences.opened', { section: 'layout' });
            }}
          >
            Manage layout
          </button>
          <button
            type="button"
            aria-pressed={density === 'comfortable'}
            onClick={() => {
              setDensity('comfortable');
              trackEvent('dashboard.density.changed', { density: 'comfortable', source: 'toolbar' });
            }}
          >
            Comfortable density
          </button>
          <button
            type="button"
            aria-pressed={density === 'compact'}
            onClick={() => {
              setDensity('compact');
              trackEvent('dashboard.density.changed', { density: 'compact', source: 'toolbar' });
            }}
          >
            Compact density
          </button>
          <button
            type="button"
            onClick={() => {
              const nextMode = dataViewMode === 'live' ? 'cached' : 'live';
              setDataViewMode(nextMode);
              trackEvent('dashboard.data-view-mode.changed', { mode: nextMode, source: 'toolbar' });
            }}
          >
            {dataViewMode === 'live' ? 'Use cached snapshots' : 'Switch to live updates'}
          </button>
          <button
            type="button"
            onClick={() => {
              trackEvent('dashboard.manual-refresh', { mode: dataViewMode });
              void queryClient.invalidateQueries({ queryKey: ['widgets', dataViewMode] });
            }}
          >
            Refresh now
          </button>
          {isFetching && <span aria-live="polite">Refreshing…</span>}
        </div>
        <div className={styles.dataSourceBanner} role="status">
          <strong>{dataSourceLabel}</strong>
          <span>
            {data?.source === 'api'
              ? 'Widgets are streaming live telemetry and workflow updates with automatic refresh.'
              : 'You are viewing cached widget data. Refresh or switch to live mode once connectivity returns.'}
          </span>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <section>
          <WidgetGrid
            widgets={visibleWidgets}
            density={density}
            dataSource={data?.source ?? 'mock'}
            onReorder={handleReorder}
            onRefresh={handleRefresh}
            onConfigure={handleConfigure}
            onHide={handleHide}
          />
        </section>
        <QuickLinksPanel
          links={pinnedQuickLinks}
          onManage={() => {
            setIsPreferencesOpen(true);
            trackEvent('dashboard.preferences.opened', { section: 'quick-links' });
          }}
          onLinkClick={(link) => trackEvent('dashboard.quick-link.clicked', { linkId: link.id })}
        />
      </div>

      <WidgetPreferencesDrawer
        widgets={orderedWidgets}
        hiddenWidgets={hiddenWidgets}
        density={density}
        dataViewMode={dataViewMode}
        quickLinks={quickLinks}
        pinnedQuickLinks={pinnedQuickLinks}
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onToggleWidget={(widgetId, hidden) => {
          toggleWidgetVisibility(widgetId, hidden);
          trackEvent('dashboard.widget.preference', { widgetId, hidden });
        }}
        onDensityChange={(nextDensity) => {
          setDensity(nextDensity);
          trackEvent('dashboard.density.changed', { density: nextDensity });
        }}
        onDataViewModeChange={(mode) => {
          setDataViewMode(mode);
          trackEvent('dashboard.data-view-mode.changed', { mode });
        }}
        onToggleQuickLink={(quickLinkId) => {
          toggleQuickLink(quickLinkId);
          trackEvent('dashboard.quick-link.toggled', { quickLinkId });
        }}
      />
    </section>
  );
}
