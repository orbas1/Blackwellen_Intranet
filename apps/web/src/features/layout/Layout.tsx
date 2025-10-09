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
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.shell} data-theme={theme}>
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
        <TopNav onToggleTheme={toggleTheme} />
        <div className={styles.content}>
          <Suspense fallback={<div className={styles.loading}>Loading experience…</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
