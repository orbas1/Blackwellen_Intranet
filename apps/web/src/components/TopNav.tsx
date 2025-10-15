import { format } from 'date-fns';
import { memo } from 'react';

import styles from './topNav.module.css';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { ThemeDefinition, ThemeId } from '../styles/themes';
import { useDesignReview } from '../state/designReview';

interface Props {
  theme: ThemeId;
  themes: readonly ThemeDefinition[];
  onSelectTheme: (theme: ThemeId) => void;
  onCycleTheme: () => void;
}

const user = {
  name: 'Danielle Rivers',
  role: 'Head of People Operations'
};

export const TopNav = memo(function TopNav({ theme, themes, onSelectTheme, onCycleTheme }: Props) {
  const today = format(new Date(), 'EEEE, MMMM d');
  const { enabled: designReviewEnabled, toggle: toggleDesignReview } = useDesignReview();

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.greeting}>Welcome back, {user.name.split(' ')[0]}</p>
        <p className={styles.meta}>
          {today} · {user.role}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.designReviewButton}
          data-active={designReviewEnabled}
          onClick={toggleDesignReview}
          aria-pressed={designReviewEnabled}
        >
          Design QA
        </button>
        <ThemeSwitcher selected={theme} themes={themes} onSelect={onSelectTheme} onCycle={onCycleTheme} />
        <img className={styles.avatar} src="https://avatars.dicebear.com/api/initials/Blackwellen.svg" alt="User avatar" />
      </div>
    </header>
  );
});
