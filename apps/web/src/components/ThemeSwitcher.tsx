import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { ThemeDefinition, ThemeId } from '../styles/themes';

import styles from './themeSwitcher.module.css';

interface Props {
  selected: ThemeId;
  themes: readonly ThemeDefinition[];
  onSelect: (theme: ThemeId) => void;
  onCycle: () => void;
}

function focusElement(node?: HTMLElement | null) {
  if (!node) {
    return;
  }
  node.focus();
}

export function ThemeSwitcher({ selected, themes, onSelect, onCycle }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<HTMLButtonElement[]>([]);
  const listboxId = useId();
  const [liveMessage, setLiveMessage] = useState('');

  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === selected) ?? themes[0],
    [selected, themes]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current || !triggerRef.current) {
        return;
      }
      if (menuRef.current.contains(target) || triggerRef.current.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        focusElement(triggerRef.current);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const selectedIndex = themes.findIndex((theme) => theme.id === selectedTheme.id);
    const node = optionRefs.current[selectedIndex];
    requestAnimationFrame(() => {
      focusElement(node);
    });
  }, [open, selectedTheme.id, themes]);

  useEffect(() => {
    if (!open) {
      optionRefs.current = [];
      setLiveMessage('');
    }
  }, [open]);

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      }
    } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onCycle();
    }
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const enabledOptions = optionRefs.current.filter(Boolean);
      if (enabledOptions.length === 0) {
        return;
      }
      const activeElement = document.activeElement;
      const currentIndex = enabledOptions.findIndex((element) => element === activeElement);
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + offset + enabledOptions.length) % enabledOptions.length;
      focusElement(enabledOptions[nextIndex]);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusElement(optionRefs.current[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusElement(optionRefs.current[optionRefs.current.length - 1]);
    }
  };

  const handleSelect = (themeId: ThemeId) => {
    onSelect(themeId);
    const definition = themes.find((theme) => theme.id === themeId);
    if (definition) {
      setLiveMessage(`${definition.name} theme applied`);
    }
    setOpen(false);
    focusElement(triggerRef.current);
  };

  return (
    <div className={styles.container}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={toggleMenu}
        onDoubleClick={onCycle}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="sr-only">Open theme and contrast settings</span>
        <span aria-hidden className={styles.triggerContent}>
          <span className={styles.swatches}>
            {selectedTheme.preview.map((color) => (
              <span key={color} className={styles.swatch} style={{ backgroundColor: color }} />
            ))}
          </span>
          <span>
            <span className={styles.triggerLabel}>{selectedTheme.name}</span>
            <span className={styles.triggerMeta}>{selectedTheme.description}</span>
          </span>
          <svg
            aria-hidden
            className={styles.chevron}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            role="presentation"
          >
            <path d="M3 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open ? (
        <div
          ref={menuRef}
          className={styles.menu}
          role="menu"
          aria-label="Theme options"
          id={listboxId}
          onKeyDown={handleMenuKeyDown}
        >
          {themes.map((theme, index) => (
            <Fragment key={theme.id}>
              <button
                ref={(node) => {
                  if (node) {
                    optionRefs.current[index] = node;
                  }
                }}
                type="button"
                className={styles.option}
                role="menuitemradio"
                aria-checked={selectedTheme.id === theme.id}
                data-selected={selectedTheme.id === theme.id}
                onClick={() => handleSelect(theme.id)}
                onFocus={() => setLiveMessage(`${theme.name}: ${theme.description}`)}
              >
                <span className={styles.optionSwatches}>
                  {theme.preview.map((color) => (
                    <span key={`${theme.id}-${color}`} className={styles.optionSwatch} style={{ backgroundColor: color }} />
                  ))}
                </span>
                <span className={styles.optionContent}>
                  <span className={styles.optionLabel}>{theme.name}</span>
                  <span className={styles.optionDescription}>{theme.description}</span>
                </span>
              </button>
              {index < themes.length - 1 ? <div className={styles.optionDivider} role="presentation" /> : null}
            </Fragment>
          ))}
          <div aria-live="polite" className="sr-only">
            {liveMessage}
          </div>
        </div>
      ) : null}
    </div>
  );
}
