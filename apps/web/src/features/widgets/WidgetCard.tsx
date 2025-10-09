import { clsx } from 'clsx';
import { Widget } from '../../services/intranetApi';
import styles from './widgetCard.module.css';

interface Props {
  widget: Widget;
  dataSource: 'api' | 'mock';
}

export function WidgetCard({ widget, dataSource }: Props) {
  return (
    <article className={clsx(styles.card, styles[widget.type])}>
      <header>
        <span className={styles.badge}>{widget.type}</span>
        <h3>{widget.title}</h3>
      </header>
      <p className={styles.description}>{widget.description}</p>
      {widget.metrics && (
        <dl className={styles.metrics}>
          {widget.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {widget.cta && (
        <a className={styles.cta} href={widget.cta.href}>
          {widget.cta.label}
        </a>
      )}
      <footer className={styles.footer}>Data source: {dataSource === 'api' ? 'live' : 'offline dataset'}</footer>
    </article>
  );
}
