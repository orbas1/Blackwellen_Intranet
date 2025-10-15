import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { useDesignReview } from '../state/designReview';
import { useTheme } from '../state/theme';
import { themeMap } from '../styles/themes';

import styles from './designReviewOverlay.module.css';

export function DesignReviewOverlay() {
  const { enabled, baseline, showColumns, setEnabled, increaseBaseline, decreaseBaseline, toggleColumns } = useDesignReview();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const themeDefinition = useMemo(() => themeMap[theme], [theme]);

  if (!mounted || !enabled) {
    return null;
  }

  const baselineStyle = { '--baseline': `${baseline}px` } as CSSProperties;

  return createPortal(
    <div className={styles.root} aria-hidden={!enabled}>
      <div className={styles.grid} style={baselineStyle} />
      {showColumns ? <div className={styles.columns} /> : null}
      <aside className={styles.hud} role="status" aria-live="polite">
        <header className={styles.hudHeader}>
          <div>
            <p className={styles.hudTitle}>Design QA mode</p>
            <p className={styles.hudMeta}>Theme: {themeDefinition.name}</p>
          </div>
          <button type="button" className={styles.hudClose} onClick={() => setEnabled(false)}>
            Exit
          </button>
        </header>
        <div className={styles.hudControls}>
          <div>
            <p className={styles.controlLabel}>Baseline grid</p>
            <div className={styles.controlRow}>
              <button type="button" onClick={decreaseBaseline} aria-label="Decrease baseline spacing">
                −
              </button>
              <span aria-live="polite">{baseline}px</span>
              <button type="button" onClick={increaseBaseline} aria-label="Increase baseline spacing">
                +
              </button>
            </div>
          </div>
          <div>
            <p className={styles.controlLabel}>Safe area columns</p>
            <div className={styles.controlRow}>
              <button type="button" onClick={toggleColumns} aria-pressed={showColumns}>
                {showColumns ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
        <footer className={styles.hudFooter}>
          <p>Shortcuts</p>
          <ul>
            <li>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> toggle overlay
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>↑/↓</kbd> adjust baseline
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> toggle columns
            </li>
          </ul>
        </footer>
      </aside>
    </div>,
    document.body
  );
}
