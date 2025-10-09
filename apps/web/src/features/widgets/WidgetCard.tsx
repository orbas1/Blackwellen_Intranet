import { forwardRef, type CSSProperties } from 'react';
import { clsx } from 'clsx';
import { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners';

import type { Widget } from '../../services/intranetApi';
import type { DashboardDensity } from '../../state/dashboard';
import styles from './widgetCard.module.css';

interface DragHandleProps {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

interface Props {
  widget: Widget;
  dataSource: 'api' | 'mock';
  density: DashboardDensity;
  isOffline: boolean;
  isDragging?: boolean;
  style?: CSSProperties;
  dragHandleProps?: DragHandleProps;
  onRefresh: () => void;
  onConfigure: () => void;
  onHide: () => void;
}

export const WidgetCard = forwardRef<HTMLDivElement, Props>(function WidgetCard(
  { widget, dataSource, density, isOffline, isDragging, style, dragHandleProps, onRefresh, onConfigure, onHide },
  ref
) {
  const metrics = widget.metrics ?? [];
  const tags = widget.tags ?? [];

  return (
    <article
      ref={ref}
      className={clsx(styles.card, styles[widget.type], styles[`density-${density}`])}
      data-dragging={isDragging}
      style={style}
    >
      <header className={styles.header}>
        <div>
          <span className={styles.badge}>{widget.category}</span>
          <h3>{widget.title}</h3>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Reorder widget"
            {...(dragHandleProps?.attributes ?? {})}
            {...(dragHandleProps?.listeners ?? {})}
          >
            ☰
          </button>
          <button type="button" className={styles.iconButton} onClick={onRefresh} aria-label="Refresh widget">
            ↻
          </button>
          <button type="button" className={styles.iconButton} onClick={onConfigure} aria-label="Configure widget">
            ⚙
          </button>
          <button type="button" className={styles.iconButton} onClick={onHide} aria-label="Hide widget">
            ✕
          </button>
        </div>
      </header>

      <p className={styles.description}>{widget.description}</p>

      {widget.insight && <p className={styles.insight}>{widget.insight}</p>}

      {metrics.length > 0 && (
        <dl className={styles.metrics} data-count={metrics.length}>
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>
                {metric.value}
                {metric.delta && <span className={styles.delta}>{metric.delta}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Widget topics">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {widget.cta && (
        <a className={styles.cta} href={widget.cta.href}>
          {widget.cta.label}
        </a>
      )}

      <footer className={styles.footer}>
        <span className={styles.status} data-quality={widget.dataQuality}>
          {widget.dataQuality === 'fresh' && 'Fresh data'}
          {widget.dataQuality === 'stale' && 'Stale — refresh recommended'}
          {widget.dataQuality === 'offline' && 'Offline snapshot'}
        </span>
        <span>Updated {new Date(widget.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span>Refreshes every {widget.refreshIntervalMinutes} min</span>
        <span>Source: {dataSource === 'api' ? 'Live service' : 'Offline dataset'}</span>
      </footer>

      {isOffline && <span className={styles.offlineBadge}>Offline mode</span>}
    </article>
  );
});
