import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { fetchDirectory } from '../../services/intranetApi';
import { usePreferences } from '../../state/preferences';
import { EmployeeProfileDrawer } from './EmployeeProfileDrawer';
import styles from './directory.module.css';

export function Directory() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [location, setLocation] = useState('all');
  const [activeEmployee, setActiveEmployee] = useState<string | null>(null);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const { state, dispatch } = usePreferences();
  const debouncedSearch = useDebouncedValue(search);

  const { data } = useQuery({
    queryKey: ['directory'],
    queryFn: () => fetchDirectory(),
    staleTime: 5 * 60 * 1000
  });

  const directory = useMemo(() => data?.data ?? [], [data]);

  const filteredDirectory = useMemo(() => {
    return directory.filter((entry) => {
      if (showPinnedOnly && !state.pinnedEmployees.includes(entry.id)) {
        return false;
      }

      if (department !== 'all' && entry.department !== department) {
        return false;
      }

      if (location !== 'all' && entry.location !== location) {
        return false;
      }

      if (!debouncedSearch) {
        return true;
      }

      const normalized = debouncedSearch.toLowerCase();
      return [entry.name, entry.department, entry.role, entry.location]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
  }, [directory, debouncedSearch, department, location, showPinnedOnly, state.pinnedEmployees]);

  const departments = useMemo(() => {
    const set = new Set(directory.map((entry) => entry.department));
    return ['all', ...Array.from(set).sort()];
  }, [directory]);

  const locations = useMemo(() => {
    const set = new Set(directory.map((entry) => entry.location));
    return ['all', ...Array.from(set).sort()];
  }, [directory]);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredDirectory.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 148,
    overscan: 6
  });

  const pinnedSet = new Set(state.pinnedEmployees);
  const selectedEmployee =
    directory.find((entry) => entry.id === activeEmployee) ?? filteredDirectory.find((entry) => entry.id === activeEmployee) ??
    null;

  return (
    <section className={styles.wrapper}>
      <header>
        <div>
          <h1>Employee Directory</h1>
          <p>Search colleagues, view reporting lines, and understand distributed skill coverage.</p>
        </div>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by name, department, or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>

      <div className={styles.meta}>
        <span>{directory.length} people</span>
        <span>{departments.length - 1} departments</span>
        <span>Source: {data?.source === 'api' ? 'Real-time HRIS' : 'Offline sync snapshot'}</span>
      </div>

      <div className={styles.toolbar}>
        <label>
          Department
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All departments' : dept}
              </option>
            ))}
          </select>
        </label>
        <label>
          Location
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'all' ? 'All locations' : loc}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={showPinnedOnly} onChange={(event) => setShowPinnedOnly(event.target.checked)} /> Show
          pinned only
        </label>
      </div>

      <div className={styles.content}>
        <div ref={parentRef} className={styles.virtualList}>
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const entry = filteredDirectory[virtualRow.index];
              const isPinned = pinnedSet.has(entry.id);

              return (
                <article
                  key={entry.id}
                  className={styles.card}
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                  data-active={entry.id === activeEmployee}
                >
                  <header>
                    <div>
                      <h3>{entry.name}</h3>
                      <p>{entry.role}</p>
                    </div>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        onClick={() => setActiveEmployee(entry.id)}
                        className={styles.secondaryButton}
                      >
                        View profile
                      </button>
                      <button
                        type="button"
                        className={styles.iconButton}
                        onClick={() =>
                          dispatch({ type: isPinned ? 'unpin-employee' : 'pin-employee', id: entry.id })
                        }
                        aria-pressed={isPinned}
                      >
                        {isPinned ? '★' : '☆'}
                        <span className="sr-only">{isPinned ? 'Unpin from quick access' : 'Pin to quick access'}</span>
                      </button>
                    </div>
                  </header>
                  <dl>
                    <div>
                      <dt>Department</dt>
                      <dd>{entry.department}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{entry.location}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${entry.email}`}>{entry.email}</a>
                      </dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={`tel:${entry.phone}`}>{entry.phone}</a>
                      </dd>
                    </div>
                  </dl>
                  <footer>
                    <p className={styles.skillsLabel}>Skills</p>
                    <ul className={styles.skills}>
                      {entry.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
        <EmployeeProfileDrawer
          employee={selectedEmployee}
          onClose={() => setActiveEmployee(null)}
        />
      </div>
    </section>
  );
}
