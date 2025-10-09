import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { TopNav } from '../../components/TopNav';
import { useTheme } from '../../state/theme';
import styles from './layout.module.css';

const navItems = [
  { to: '/', label: 'Adaptive Home' },
  { to: '/directory', label: 'Directory' },
  { to: '/knowledge', label: 'Knowledge' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/service-hub', label: 'Service Hub' }
];

export function Layout() {
  const { theme, setTheme, cycleTheme, themes } = useTheme();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Blackwellen</div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)} end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        <TopNav theme={theme} themes={themes} onSelectTheme={setTheme} onCycleTheme={cycleTheme} />
        <div className={styles.content}>
          <Suspense fallback={<div className={styles.loading}>Loading experience…</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
