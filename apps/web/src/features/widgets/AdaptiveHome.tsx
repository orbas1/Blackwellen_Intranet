import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';

import { fetchWidgets } from '../../services/intranetApi';
import { WidgetCard } from './WidgetCard';
import styles from './adaptiveHome.module.css';

export function AdaptiveHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['widgets'],
    queryFn: () => fetchWidgets()
  });

  if (isLoading) {
    return <div className={styles.state}>Preparing your adaptive experience…</div>;
  }

  if (error) {
    return <div className={clsx(styles.state, styles.error)}>We couldn’t load widgets. Try refreshing the page.</div>;
  }

  return (
    <section className={styles.grid}>
      {data?.data.map((widget) => (
        <WidgetCard key={widget.id} widget={widget} dataSource={data.source} />
      ))}
    </section>
  );
}
