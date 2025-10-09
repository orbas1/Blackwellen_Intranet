import { useEffect, useRef } from 'react';

import type { Widget } from '../../services/intranetApi';
import { DashboardQuickLink, DashboardDensity, DataViewMode } from '../../state/dashboard';
import styles from './widgetPreferencesDrawer.module.css';

type WidgetPreferencesDrawerProps = {
  widgets: Widget[];
  hiddenWidgets: string[];
  density: DashboardDensity;
  dataViewMode: DataViewMode;
  quickLinks: DashboardQuickLink[];
  pinnedQuickLinks: DashboardQuickLink[];
  isOpen: boolean;
  onClose: () => void;
  onToggleWidget: (widgetId: string, hidden?: boolean) => void;
  onDensityChange: (density: DashboardDensity) => void;
  onDataViewModeChange: (mode: DataViewMode) => void;
  onToggleQuickLink: (quickLinkId: string) => void;
};

export function WidgetPreferencesDrawer({
  widgets,
  hiddenWidgets,
  density,
  dataViewMode,
  quickLinks,
  pinnedQuickLinks,
  isOpen,
  onClose,
  onToggleWidget,
  onDensityChange,
  onDataViewModeChange,
  onToggleQuickLink
}: WidgetPreferencesDrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        dialogRef.current?.focus();
      }, 50);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const hiddenSet = new Set(hiddenWidgets);
  const pinnedQuickLinkIds = new Set(pinnedQuickLinks.map((link) => link.id));

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="widget-preferences-title"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div>
            <h2 id="widget-preferences-title">Personalise dashboard</h2>
            <p>
              Configure data freshness, card density, and which widgets or quick actions should appear on your adaptive home.
            </p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </header>

        <section className={styles.section} aria-labelledby="data-freshness-heading">
          <h3 id="data-freshness-heading">Data freshness</h3>
          <fieldset className={styles.fieldset}>
            <legend className="sr-only">Select data freshness mode</legend>
            <label>
              <input
                type="radio"
                name="dataViewMode"
                value="live"
                checked={dataViewMode === 'live'}
                onChange={() => onDataViewModeChange('live')}
              />
              Live updates — refresh widgets every few minutes for the latest view.
            </label>
            <label>
              <input
                type="radio"
                name="dataViewMode"
                value="cached"
                checked={dataViewMode === 'cached'}
                onChange={() => onDataViewModeChange('cached')}
              />
              Optimise for stability — use cached snapshots, refreshing only on demand.
            </label>
          </fieldset>
        </section>

        <section className={styles.section} aria-labelledby="density-heading">
          <h3 id="density-heading">Density</h3>
          <fieldset className={styles.fieldset}>
            <legend className="sr-only">Select widget density</legend>
            <label>
              <input
                type="radio"
                name="density"
                value="comfortable"
                checked={density === 'comfortable'}
                onChange={() => onDensityChange('comfortable')}
              />
              Comfortable — spacious layout best for large monitors.
            </label>
            <label>
              <input
                type="radio"
                name="density"
                value="compact"
                checked={density === 'compact'}
                onChange={() => onDensityChange('compact')}
              />
              Compact — denser cards with reduced padding for high information density.
            </label>
          </fieldset>
        </section>

        <section className={styles.section} aria-labelledby="widget-visibility-heading">
          <h3 id="widget-visibility-heading">Widgets</h3>
          <ul className={styles.widgetList}>
            {widgets.map((widget) => {
              const isHidden = hiddenSet.has(widget.id);
              return (
                <li key={widget.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!isHidden}
                      onChange={(event) => onToggleWidget(widget.id, !event.target.checked)}
                    />
                    <span>
                      <strong>{widget.title}</strong>
                      <small>{widget.description}</small>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="quick-link-heading">
          <h3 id="quick-link-heading">Quick actions</h3>
          <ul className={styles.quickLinkList}>
            {quickLinks.map((link) => {
              const isPinned = pinnedQuickLinkIds.has(link.id);
              return (
                <li key={link.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={() => onToggleQuickLink(link.id)}
                    />
                    <span>
                      <strong>{link.label}</strong>
                      <small>{link.description}</small>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>
    </div>
  );
}
