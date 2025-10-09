import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useMemo, useState } from 'react';

import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { fetchKnowledge } from '../../services/intranetApi';
import styles from './knowledgeHub.module.css';

export function KnowledgeHub() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<'all' | 'approved' | 'draft' | 'archived'>('all');
  const debouncedSearch = useDebouncedValue(search);

  const { data, isFetching } = useQuery({
    queryKey: ['knowledge'],
    queryFn: () => fetchKnowledge()
  });

  const articles = useMemo(() => data?.data ?? [], [data]);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(articles.map((article) => article.category))).sort()];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      if (category !== 'all' && article.category !== category) {
        return false;
      }

      if (status !== 'all' && article.status !== status) {
        return false;
      }

      if (!debouncedSearch) {
        return true;
      }

      const normalized = debouncedSearch.toLowerCase();
      return [article.title, article.summary, article.author, article.tags.join(' ')].some((value) =>
        value.toLowerCase().includes(normalized)
      );
    });
  }, [articles, category, status, debouncedSearch]);

  return (
    <section className={styles.wrapper}>
      <header>
        <div>
          <h1>Knowledge Hub</h1>
          <p>Version-controlled documentation with attestation states and AI tagging for accelerated discovery.</p>
        </div>
        <input
          className={styles.search}
          type="search"
          placeholder="Search knowledge base"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>

      <div className={styles.controls}>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All categories' : item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
            <option value="all">All statuses</option>
            <option value="approved">Approved</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <p className={styles.meta}>{filtered.length} articles</p>
      </div>

      <div className={styles.list}>
        {filtered.map((article) => (
          <article key={article.id}>
            <div>
              <p className={styles.category}>{article.category}</p>
              <h3>{article.title}</h3>
              <p className={styles.summary}>{article.summary}</p>
            </div>
            <footer>
              <span>Last updated {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}</span>
              <span>Owner: {article.author}</span>
              <span>Status: {article.status}</span>
              <ul>
                {article.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </footer>
          </article>
        ))}
      </div>
      {isFetching && <div className={styles.refreshHint}>Refreshing knowledge library…</div>}
    </section>
  );
}
