import { format } from 'date-fns';
import { memo } from 'react';

import styles from './topNav.module.css';

interface Props {
  onToggleTheme: () => void;
}

const user = {
  name: 'Danielle Rivers',
  role: 'Head of People Operations'
};

export const TopNav = memo(function TopNav({ onToggleTheme }: Props) {
  const today = format(new Date(), 'EEEE, MMMM d');

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.greeting}>Welcome back, {user.name.split(' ')[0]}</p>
        <p className={styles.meta}>
          {today} · {user.role}
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onToggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
          Switch theme
        </button>
        <img className={styles.avatar} src="https://avatars.dicebear.com/api/initials/Blackwellen.svg" alt="User avatar" />
      </div>
    </header>
  );
});
