import { useQuery } from '@tanstack/react-query';

import { fetchWorkflows } from '../../services/intranetApi';
import styles from './serviceHub.module.css';

export function ServiceHub() {
  const { data } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => fetchWorkflows()
  });

  return (
    <section className={styles.wrapper}>
      <header>
        <h1>Service Hub</h1>
        <p>Monitor workflow health, SLA performance, and queue depth before approving new intake.</p>
        <button type="button" className={styles.newRequest}>
          Launch new request
        </button>
      </header>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Workflow</th>
            <th>SLA</th>
            <th>Queue depth</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((workflow) => (
            <tr key={workflow.id} data-healthy={workflow.healthy}>
              <td>{workflow.name}</td>
              <td>{workflow.slaHours}h</td>
              <td>{workflow.queueDepth}</td>
              <td>{workflow.healthy ? 'Healthy' : 'Action required'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.source}>Source: {data?.source === 'api' ? 'Live service orchestration' : 'Offline snapshot'}.</p>
    </section>
  );
}
