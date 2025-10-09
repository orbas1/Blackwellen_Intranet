import { DashboardQuickLink } from '../../state/dashboard';
import styles from './quickLinksPanel.module.css';

type QuickLinksPanelProps = {
  links: DashboardQuickLink[];
  onLinkClick: (link: DashboardQuickLink) => void;
  onManage: () => void;
};

export function QuickLinksPanel({ links, onLinkClick, onManage }: QuickLinksPanelProps) {
  return (
    <section className={styles.panel} aria-labelledby="quick-links-heading">
      <header className={styles.header}>
        <div>
          <h2 id="quick-links-heading">Quick actions</h2>
          <p>Launch the tools you rely on most. Personalise this list to match your daily flow.</p>
        </div>
        <button type="button" className={styles.manageButton} onClick={onManage}>
          Manage
        </button>
      </header>
      <div className={styles.list} role="list">
        {links.map((link) => (
          <a
            key={link.id}
            role="listitem"
            href={link.href}
            className={styles.link}
            onClick={() => onLinkClick(link)}
            title={link.description}
            data-icon={link.icon}
          >
            <span>{link.label}</span>
            <small>{link.description}</small>
          </a>
        ))}
        {links.length === 0 && (
          <p className={styles.empty}>Add quick actions to keep your most used workflows one click away.</p>
        )}
      </div>
    </section>
  );
}
