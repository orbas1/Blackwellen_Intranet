import type { DirectoryEntry } from '../../services/intranetApi';
import styles from './employeeProfileDrawer.module.css';

interface Props {
  employee: DirectoryEntry | null;
  onClose: () => void;
}

export function EmployeeProfileDrawer({ employee, onClose }: Props) {
  return (
    <aside className={styles.drawer} data-open={Boolean(employee)}>
      <div className={styles.header}>
        <h2>{employee?.name ?? 'Team member profile'}</h2>
        <button type="button" onClick={onClose} aria-label="Close profile">
          ×
        </button>
      </div>

      {employee ? (
        <div className={styles.content}>
          <section>
            <h3>{employee.role}</h3>
            <p>{employee.department}</p>
            <dl className={styles.definitionList}>
              <div>
                <dt>Location</dt>
                <dd>{employee.location}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${employee.phone}`}>{employee.phone}</a>
                </dd>
              </div>
              {employee.timeZone ? (
                <div>
                  <dt>Time zone</dt>
                  <dd>{employee.timeZone}</dd>
                </div>
              ) : null}
              {employee.workingHours ? (
                <div>
                  <dt>Working hours</dt>
                  <dd>{employee.workingHours}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          {employee.bio ? (
            <section>
              <h4>Focus areas</h4>
              <p>{employee.bio}</p>
            </section>
          ) : null}

          <section>
            <h4>Skills & credentials</h4>
            <ul className={styles.skillList}>
              {employee.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          {employee.manager ? (
            <section>
              <h4>Reports to</h4>
              <p>{employee.manager.name}</p>
              <p className={styles.meta}>{employee.manager.role}</p>
            </section>
          ) : null}

          {employee.directReports?.length ? (
            <section>
              <h4>Direct reports</h4>
              <ul className={styles.list}>
                {employee.directReports.map((report) => (
                  <li key={report.id}>
                    <span>{report.name}</span>
                    <span className={styles.meta}>{report.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {employee.currentProjects?.length ? (
            <section>
              <h4>Current projects</h4>
              <ul className={styles.list}>
                {employee.currentProjects.map((project) => (
                  <li key={project}>
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {employee.supportHours?.length ? (
            <section>
              <h4>Support coverage</h4>
              <ul className={styles.list}>
                {employee.supportHours.map((entry) => (
                  <li key={`${entry.day}-${entry.hours}`}>
                    <span>{entry.day}</span>
                    <span className={styles.meta}>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : (
        <div className={styles.placeholder}>
          <p>Select a person to review their contact information, reporting line, and focus areas.</p>
        </div>
      )}
    </aside>
  );
}
