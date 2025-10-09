import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  KnowledgeArticle,
  ServiceRequestPayload,
  ServiceTemplate,
  WorkflowSummary,
  fetchKnowledge,
  fetchServiceCatalog,
  fetchWorkflows,
  submitServiceRequest
} from '../../services/intranetApi';
import styles from './serviceHub.module.css';

type Step = 'Details' | 'Attachments' | 'Review';

const steps: Step[] = ['Details', 'Attachments', 'Review'];

const URGENCY_OPTIONS: { value: ServiceRequestPayload['urgency']; label: string }[] = [
  { value: 'critical', label: 'Critical — incident or outage' },
  { value: 'high', label: 'High — SLA at risk' },
  { value: 'normal', label: 'Standard — within SLA' },
  { value: 'low', label: 'Low — informational update' }
];

type FormState = {
  summary: string;
  urgency: ServiceRequestPayload['urgency'];
  dueDate: string;
  context: string;
  dynamicFields: Record<string, string>;
  attachments: { name: string; link: string }[];
  notifyManager: boolean;
};

type ValidationState = {
  details: boolean;
  attachments: boolean;
  review: boolean;
};

type SubmissionResult = Awaited<ReturnType<typeof submitServiceRequest>>;

type DynamicFieldErrors = Record<string, string | undefined>;

function resolveUrgency(priority: ServiceTemplate['priority']): ServiceRequestPayload['urgency'] {
  switch (priority) {
    case 'critical':
      return 'critical';
    case 'high':
      return 'high';
    case 'medium':
      return 'normal';
    default:
      return 'low';
  }
}

function formatRelative(iso: string): string {
  try {
    return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
  } catch (error) {
    console.warn('Unable to format timestamp', { iso, error });
    return 'recently';
  }
}

function getSlaLevel(slaHours: number): 'critical' | 'fast' | 'standard' | 'extended' {
  if (slaHours <= 8) return 'critical';
  if (slaHours <= 24) return 'fast';
  if (slaHours <= 72) return 'standard';
  return 'extended';
}

function describeTrend(trend: WorkflowSummary['backlogTrend']): string {
  switch (trend) {
    case 'up':
      return 'Rising backlog';
    case 'down':
      return 'Clearing backlog';
    default:
      return 'Stable volume';
  }
}

function initialiseForm(service: ServiceTemplate | null): FormState {
  const dynamicFields: Record<string, string> = {};
  service?.requiredFields.forEach((field) => {
    if (field.type === 'select' && field.options?.length) {
      dynamicFields[field.id] = '';
    } else {
      dynamicFields[field.id] = '';
    }
  });

  return {
    summary: service ? `${service.name} request` : '',
    urgency: service ? resolveUrgency(service.priority) : 'normal',
    dueDate: '',
    context: '',
    dynamicFields,
    attachments: [],
    notifyManager: true
  };
}

function getFieldDisplayValue(field: ServiceTemplate['requiredFields'][number], value: string): string {
  if (!value) {
    return 'Not provided';
  }

  if (field.type === 'select' && field.options) {
    const match = field.options.find((option) => option.value === value);
    return match ? match.label : value;
  }

  return value;
}

export function ServiceHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | ServiceTemplate['department']>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formState, setFormState] = useState<FormState>(() => initialiseForm(null));
  const [validationState, setValidationState] = useState<ValidationState>({ details: false, attachments: false, review: false });
  const [attachmentDraft, setAttachmentDraft] = useState<{ name: string; link: string }>({ name: '', link: '' });
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const catalogQuery = useQuery({ queryKey: ['serviceCatalog'], queryFn: fetchServiceCatalog });
  const workflowsQuery = useQuery({ queryKey: ['workflows'], queryFn: fetchWorkflows });
  const knowledgeQuery = useQuery({ queryKey: ['knowledge-base'], queryFn: fetchKnowledge });

  const serviceCatalog = catalogQuery.data?.data ?? [];
  const workflows = workflowsQuery.data?.data ?? [];
  const knowledgeArticles = knowledgeQuery.data?.data ?? [];

  const workflowById = useMemo(() => {
    return new Map(workflows.map((workflow) => [workflow.id, workflow]));
  }, [workflows]);

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return serviceCatalog
      .filter((service) => {
        const matchesDepartment = departmentFilter === 'all' || service.department === departmentFilter;
        if (!normalizedSearch) {
          return matchesDepartment;
        }
        const haystack = [service.name, service.description, service.tags.join(' ')].join(' ').toLowerCase();
        return matchesDepartment && haystack.includes(normalizedSearch);
      })
      .sort((a, b) => {
        const priorityRank: Record<ServiceTemplate['priority'], number> = {
          critical: 0,
          high: 1,
          medium: 2,
          low: 3
        };
        const priorityComparison = priorityRank[a.priority] - priorityRank[b.priority];
        if (priorityComparison !== 0) {
          return priorityComparison;
        }
        return b.requestVolume - a.requestVolume;
      });
  }, [serviceCatalog, departmentFilter, searchTerm]);

  const departments = useMemo(() => {
    return Array.from(new Set(serviceCatalog.map((service) => service.department))).sort();
  }, [serviceCatalog]);

  const selectedService = useMemo(() => {
    if (!selectedServiceId) {
      return filteredServices[0] ?? null;
    }
    return filteredServices.find((service) => service.id === selectedServiceId) ?? null;
  }, [filteredServices, selectedServiceId]);

  const selectedWorkflow = selectedService ? workflowById.get(selectedService.workflowId) ?? null : null;

  const recommendedArticles = useMemo(() => {
    if (!selectedService) {
      return knowledgeArticles.slice(0, 3);
    }

    const taggedMatches = knowledgeArticles.filter((article) => {
      if (selectedService.knowledgeArticleIds.includes(article.id)) {
        return true;
      }
      return article.tags.some((tag) => selectedService.tags.includes(tag));
    });

    if (taggedMatches.length >= 3) {
      return taggedMatches.slice(0, 3);
    }

    const additional = knowledgeArticles
      .filter((article) => !taggedMatches.includes(article))
      .slice(0, Math.max(0, 3 - taggedMatches.length));
    return [...taggedMatches, ...additional];
  }, [knowledgeArticles, selectedService]);

  const summaryMetrics = useMemo(() => {
    if (!serviceCatalog.length) {
      return null;
    }
    const totalTemplates = serviceCatalog.length;
    const activeQueue = workflows.reduce((total, workflow) => total + workflow.queueDepth, 0);
    const avgBreachRate = workflows.length
      ? Math.round(workflows.reduce((total, workflow) => total + workflow.breachedPercent, 0) / workflows.length)
      : 0;
    return { totalTemplates, activeQueue, avgBreachRate };
  }, [serviceCatalog, workflows]);

  const dynamicFieldErrors: DynamicFieldErrors = useMemo(() => {
    if (!selectedService) {
      return {};
    }
    const errors: DynamicFieldErrors = {};
    selectedService.requiredFields.forEach((field) => {
      const value = formState.dynamicFields[field.id]?.trim();
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required.`;
        return;
      }
      if (field.type === 'number' && value) {
        const numericValue = Number(value);
        if (Number.isNaN(numericValue) || numericValue < 0) {
          errors[field.id] = 'Enter a valid positive number.';
        }
      }
      if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors[field.id] = 'Enter a valid email address.';
        }
      }
    });

    const startDate = formState.dynamicFields.startDate;
    const endDate = formState.dynamicFields.endDate;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end.getTime() < start.getTime()) {
        errors.endDate = 'Return date must be on or after the start date.';
      }
    }

    return errors;
  }, [formState.dynamicFields, selectedService]);

  const summaryValid = formState.summary.trim().length >= 8;
  const dueDateError = useMemo(() => {
    if (!formState.dueDate) {
      return '';
    }
    const selectedDate = new Date(formState.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() < today.getTime()) {
      return 'Due date must be in the future.';
    }
    return '';
  }, [formState.dueDate]);

  const detailsValid = summaryValid && !dueDateError && Object.values(dynamicFieldErrors).every((value) => !value);
  const attachmentsValid = selectedService?.attachments.required ? formState.attachments.length > 0 : true;
  const reviewValid = detailsValid && attachmentsValid;

  const submitMutation = useMutation({
    mutationFn: (payload: ServiceRequestPayload) => submitServiceRequest(payload),
    onSuccess: (result) => {
      setSubmissionResult(result);
    }
  });

  useEffect(() => {
    if (!selectedServiceId && filteredServices.length) {
      setSelectedServiceId(filteredServices[0].id);
    }
  }, [filteredServices, selectedServiceId]);

  useEffect(() => {
    setCurrentStep(0);
    setValidationState({ details: false, attachments: false, review: false });
    setFormState(initialiseForm(selectedService ?? null));
    setAttachmentDraft({ name: '', link: '' });
    setAttachmentError(null);
    setSubmissionResult(null);
  }, [selectedService?.id]);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleChangeDynamicField = (fieldId: string, value: string) => {
    setFormState((previous) => ({
      ...previous,
      dynamicFields: {
        ...previous.dynamicFields,
        [fieldId]: value
      }
    }));
  };

  const handleAddAttachment = () => {
    const name = attachmentDraft.name.trim();
    const link = attachmentDraft.link.trim();
    if (!name || !link) {
      setAttachmentError('Provide both a file name and a shareable link.');
      return;
    }
    try {
      // Validate URL structure — allow mailto/https/onedrive/teams share links.
      const parsed = new URL(link);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Unsupported protocol');
      }
    } catch (error) {
      setAttachmentError('Enter a valid https:// link accessible to reviewers.');
      return;
    }

    setFormState((previous) => ({
      ...previous,
      attachments: [...previous.attachments, { name, link }]
    }));
    setAttachmentDraft({ name: '', link: '' });
    setAttachmentError(null);
  };

  const handleRemoveAttachment = (index: number) => {
    setFormState((previous) => ({
      ...previous,
      attachments: previous.attachments.filter((_, attachmentIndex) => attachmentIndex !== index)
    }));
  };

  const goToNextStep = () => {
    if (currentStep === 0) {
      setValidationState((previous) => ({ ...previous, details: true }));
      if (!detailsValid) {
        return;
      }
    }
    if (currentStep === 1) {
      setValidationState((previous) => ({ ...previous, attachments: true }));
      if (!attachmentsValid) {
        return;
      }
    }
    setCurrentStep((previous) => Math.min(previous + 1, steps.length - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
  };

  const handleSubmit = () => {
    if (!selectedService) {
      return;
    }
    setValidationState((previous) => ({ ...previous, review: true }));
    if (!reviewValid) {
      return;
    }

    const payload: ServiceRequestPayload = {
      serviceId: selectedService.id,
      summary: formState.summary.trim(),
      urgency: formState.urgency,
      dueDate: formState.dueDate || undefined,
      context: formState.context.trim() || undefined,
      dynamicFields: formState.dynamicFields,
      attachments: formState.attachments,
      notifyManager: formState.notifyManager
    };

    submitMutation.mutate(payload);
  };

  const handleStartNewRequest = () => {
    setFormState(initialiseForm(selectedService ?? null));
    setCurrentStep(0);
    setValidationState({ details: false, attachments: false, review: false });
    setSubmissionResult(null);
    setAttachmentDraft({ name: '', link: '' });
    setAttachmentError(null);
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <h1>Service Hub</h1>
          <p>
            Launch cross-department service requests, monitor workflow health, and surface the right knowledge before
            escalation. Personalised templates, SLA indicators, and contextual guidance help teams keep work flowing.
          </p>
        </div>
        {summaryMetrics && (
          <dl className={styles.metrics}>
            <div>
              <dt>Service templates</dt>
              <dd>{summaryMetrics.totalTemplates}</dd>
            </div>
            <div>
              <dt>Requests in queue</dt>
              <dd>{summaryMetrics.activeQueue}</dd>
            </div>
            <div>
              <dt>Avg. breach rate</dt>
              <dd>{summaryMetrics.avgBreachRate}%</dd>
            </div>
          </dl>
        )}
      </header>

      <div className={styles.layout}>
        <aside className={styles.filtersPanel}>
          <label className={styles.searchLabel} htmlFor="service-search">
            Search catalog
          </label>
          <input
            id="service-search"
            className={styles.searchInput}
            type="search"
            placeholder="Find a service, e.g. laptop, leave, vendor onboarding"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <div className={styles.filterGroup}>
            <span className={styles.filterGroupLabel}>Department</span>
            <div className={styles.filterChips}>
              <button
                type="button"
                className={clsx(styles.filterChip, departmentFilter === 'all' && styles.activeFilter)}
                onClick={() => setDepartmentFilter('all')}
              >
                All
              </button>
              {departments.map((department) => (
                <button
                  key={department}
                  type="button"
                  className={clsx(styles.filterChip, departmentFilter === department && styles.activeFilter)}
                  onClick={() => setDepartmentFilter(department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.panelCard}>
            <h2>Workflow status</h2>
            <ul>
              {workflows.map((workflow) => (
                <li key={workflow.id}>
                  <div className={styles.workflowName}>{workflow.name}</div>
                  <div className={styles.workflowMeta}>
                    <span className={styles.badge} data-health={workflow.healthy ? 'healthy' : 'risk'}>
                      {workflow.healthy ? 'On track' : 'Needs attention'}
                    </span>
                    <span>{workflow.queueDepth} in queue</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.dataSource}>Source: {workflowsQuery.data?.source === 'api' ? 'Live orchestration' : 'Operational snapshot'}.</p>
          </div>
        </aside>

        <main className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <div>
              <h2>Service catalog</h2>
              <p>Pick a template to launch the guided intake. Results are prioritised by urgency and demand.</p>
            </div>
            <span className={styles.catalogCount}>{filteredServices.length} templates</span>
          </div>

          {catalogQuery.isLoading && <p className={styles.loading}>Loading service catalog…</p>}

          {!catalogQuery.isLoading && filteredServices.length === 0 && (
            <p className={styles.emptyState}>No services match your filters. Adjust the search or department selection.</p>
          )}

          <div className={styles.catalogGrid}>
            {filteredServices.map((service) => {
              const level = getSlaLevel(service.slaHours);
              return (
                <article
                  key={service.id}
                  className={clsx(styles.serviceCard, selectedService?.id === service.id && styles.activeService)}
                  onClick={() => handleSelectService(service.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleSelectService(service.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedService?.id === service.id}
                >
                  <header>
                    <span className={styles.departmentBadge}>{service.department}</span>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </header>
                  <dl className={styles.serviceMeta}>
                    <div>
                      <dt>SLA</dt>
                      <dd>
                        <span className={styles.slaBadge} data-level={level}>
                          {service.slaHours}h response
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt>Volume (30d)</dt>
                      <dd>{service.requestVolume}</dd>
                    </div>
                    <div>
                      <dt>Priority</dt>
                      <dd className={styles.priorityLabel}>{service.priority}</dd>
                    </div>
                    <div>
                      <dt>Last updated</dt>
                      <dd>{formatRelative(service.lastUpdated)}</dd>
                    </div>
                  </dl>
                  <footer className={styles.tagList}>
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </footer>
                </article>
              );
            })}
          </div>

          <section className={styles.workflowSection}>
            <div className={styles.workflowSectionHeader}>
              <h2>Operational health</h2>
              <p>Monitor queue depth, breach rate, and throughput across connected workflows.</p>
            </div>
            <table className={styles.workflowTable}>
              <thead>
                <tr>
                  <th scope="col">Workflow</th>
                  <th scope="col">SLA</th>
                  <th scope="col">Queue depth</th>
                  <th scope="col">Breach rate</th>
                  <th scope="col">Avg completion</th>
                  <th scope="col">Trend</th>
                </tr>
              </thead>
              <tbody>
                {workflows.map((workflow) => (
                  <tr key={workflow.id} data-health={workflow.healthy ? 'healthy' : 'risk'}>
                    <th scope="row">{workflow.name}</th>
                    <td>{workflow.slaHours}h</td>
                    <td>{workflow.queueDepth}</td>
                    <td>{workflow.breachedPercent}%</td>
                    <td>{workflow.avgCompletionHours}h</td>
                    <td>{describeTrend(workflow.backlogTrend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.dataSource}>
              Data source: {workflowsQuery.data?.source === 'api' ? 'Live orchestration' : 'Operational snapshot'}.
            </p>
          </section>
        </main>

        <aside className={styles.intakePanel}>
          {selectedService ? (
            <div className={styles.intakeContent}>
              <header className={styles.intakeHeader}>
                <h2>Launch request</h2>
                <p>Select a service to populate the guided intake. SLA insights and knowledge cards keep submissions audit ready.</p>
              </header>

              <ol className={styles.stepper}>
                {steps.map((step, index) => (
                  <li key={step} className={clsx(styles.step, currentStep === index && styles.activeStep, index < currentStep && styles.completedStep)}>
                    <span className={styles.stepIndex}>{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              {submissionResult && (
                <div className={styles.successBanner} role="status">
                  <strong>Request submitted</strong>
                  <p>
                    Reference <code>{submissionResult.data.requestId}</code>. Estimated response in ~{submissionResult.data.etaHours}h.
                    {submissionResult.source === 'mock' && ' (Queued via offline snapshot while live API is unavailable.)'}
                  </p>
                  <button type="button" className={styles.secondaryButton} onClick={handleStartNewRequest}>
                    Start another request
                  </button>
                </div>
              )}

              {!submissionResult && (
                <form
                  className={styles.form}
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  {currentStep === 0 && (
                    <div className={styles.formGrid}>
                      <div className={styles.field}>
                        <label htmlFor="request-summary">Summary</label>
                        <input
                          id="request-summary"
                          name="summary"
                          type="text"
                          value={formState.summary}
                          onChange={(event) => setFormState((previous) => ({ ...previous, summary: event.target.value }))}
                          aria-invalid={validationState.details && !summaryValid}
                          placeholder={`Describe the ${selectedService.name.toLowerCase()}`}
                        />
                        {validationState.details && !summaryValid && <p className={styles.error}>Provide a short summary (at least 8 characters).</p>}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="request-urgency">Urgency</label>
                        <select
                          id="request-urgency"
                          name="urgency"
                          value={formState.urgency}
                          onChange={(event) =>
                            setFormState((previous) => ({
                              ...previous,
                              urgency: event.target.value as ServiceRequestPayload['urgency']
                            }))
                          }
                        >
                          {URGENCY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="request-due-date">Desired completion</label>
                        <input
                          id="request-due-date"
                          name="dueDate"
                          type="date"
                          value={formState.dueDate}
                          onChange={(event) => setFormState((previous) => ({ ...previous, dueDate: event.target.value }))}
                          aria-invalid={Boolean(validationState.details && dueDateError)}
                        />
                        {validationState.details && dueDateError && <p className={styles.error}>{dueDateError}</p>}
                      </div>

                      <div className={clsx(styles.field, styles.fullWidthField)}>
                        <label htmlFor="request-context">Additional context</label>
                        <textarea
                          id="request-context"
                          name="context"
                          rows={4}
                          value={formState.context}
                          onChange={(event) => setFormState((previous) => ({ ...previous, context: event.target.value }))}
                          placeholder="Share relevant background, stakeholders, or impacted systems."
                        />
                      </div>

                      {selectedService.requiredFields.map((field) => {
                        const value = formState.dynamicFields[field.id] ?? '';
                        const error = validationState.details ? dynamicFieldErrors[field.id] : undefined;
                        const fieldProps = {
                          id: field.id,
                          name: field.id,
                          value,
                          onChange: (
                            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                          ) => handleChangeDynamicField(field.id, event.target.value),
                          'aria-invalid': Boolean(error)
                        };

                        if (field.type === 'textarea') {
                          return (
                            <div key={field.id} className={clsx(styles.field, styles.fullWidthField)}>
                              <label htmlFor={field.id}>{field.label}</label>
                              <textarea
                                {...fieldProps}
                                rows={4}
                                placeholder={field.placeholder}
                              />
                              {field.helperText && <p className={styles.helper}>{field.helperText}</p>}
                              {error && <p className={styles.error}>{error}</p>}
                            </div>
                          );
                        }

                        if (field.type === 'select') {
                          return (
                            <div key={field.id} className={styles.field}>
                              <label htmlFor={field.id}>{field.label}</label>
                              <select
                                {...fieldProps}
                                value={value}
                                onChange={(event) => handleChangeDynamicField(field.id, event.target.value)}
                              >
                                <option value="" disabled>
                                  Select an option
                                </option>
                                {field.options?.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              {field.helperText && <p className={styles.helper}>{field.helperText}</p>}
                              {error && <p className={styles.error}>{error}</p>}
                            </div>
                          );
                        }

                        if (field.type === 'date') {
                          return (
                            <div key={field.id} className={styles.field}>
                              <label htmlFor={field.id}>{field.label}</label>
                              <input
                                {...fieldProps}
                                type="date"
                                value={value}
                              />
                              {field.helperText && <p className={styles.helper}>{field.helperText}</p>}
                              {error && <p className={styles.error}>{error}</p>}
                            </div>
                          );
                        }

                        const inputType = field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text';
                        return (
                          <div key={field.id} className={styles.field}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <input
                              {...fieldProps}
                              type={inputType}
                              placeholder={field.placeholder}
                            />
                            {field.helperText && <p className={styles.helper}>{field.helperText}</p>}
                            {error && <p className={styles.error}>{error}</p>}
                          </div>
                        );
                      })}

                      <div className={clsx(styles.field, styles.checkboxField)}>
                        <label>
                          <input
                            type="checkbox"
                            checked={formState.notifyManager}
                            onChange={(event) =>
                              setFormState((previous) => ({ ...previous, notifyManager: event.target.checked }))
                            }
                          />
                          Notify my manager when the request is submitted
                        </label>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className={styles.attachmentsStep}>
                      <p className={styles.helper}>
                        {selectedService.attachments.required ? 'Supporting documentation is required.' : 'Supporting documentation is optional.'}
                        &nbsp;{selectedService.attachments.guidance}
                      </p>

                      <div className={styles.attachmentForm}>
                        <div className={styles.field}>
                          <label htmlFor="attachment-name">File name</label>
                          <input
                            id="attachment-name"
                            type="text"
                            value={attachmentDraft.name}
                            onChange={(event) => setAttachmentDraft((previous) => ({ ...previous, name: event.target.value }))}
                          />
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="attachment-link">Shareable link</label>
                          <input
                            id="attachment-link"
                            type="url"
                            placeholder="https://"
                            value={attachmentDraft.link}
                            onChange={(event) => setAttachmentDraft((previous) => ({ ...previous, link: event.target.value }))}
                          />
                        </div>
                        <button type="button" className={styles.secondaryButton} onClick={handleAddAttachment}>
                          Add attachment
                        </button>
                      </div>
                      {attachmentError && <p className={styles.error}>{attachmentError}</p>}

                      <ul className={styles.attachmentsList}>
                        {formState.attachments.map((attachment, index) => (
                          <li key={`${attachment.name}-${index}`}>
                            <div>
                              <span className={styles.attachmentName}>{attachment.name}</span>
                              <a href={attachment.link} target="_blank" rel="noreferrer">
                                Open link
                              </a>
                            </div>
                            <button type="button" className={styles.tertiaryButton} onClick={() => handleRemoveAttachment(index)}>
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>

                      {validationState.attachments && !attachmentsValid && (
                        <p className={styles.error}>At least one attachment is required for this service.</p>
                      )}

                      <div className={styles.acceptedTypes}>
                        Accepted formats: {selectedService.attachments.acceptedTypes.join(', ')}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className={styles.reviewStep}>
                      <h3>Review and confirm</h3>
                      <dl>
                        <div>
                          <dt>Service</dt>
                          <dd>{selectedService.name}</dd>
                        </div>
                        <div>
                          <dt>Summary</dt>
                          <dd>{formState.summary || 'Not provided'}</dd>
                        </div>
                        <div>
                          <dt>Urgency</dt>
                          <dd>{formState.urgency}</dd>
                        </div>
                        <div>
                          <dt>Desired completion</dt>
                          <dd>{formState.dueDate || 'Not provided'}</dd>
                        </div>
                        <div>
                          <dt>Additional context</dt>
                          <dd>{formState.context || 'Not provided'}</dd>
                        </div>
                      </dl>

                      <h4>Key details</h4>
                      <ul className={styles.reviewList}>
                        {selectedService.requiredFields.map((field) => (
                          <li key={field.id}>
                            <span>{field.label}</span>
                            <strong>{getFieldDisplayValue(field, formState.dynamicFields[field.id])}</strong>
                          </li>
                        ))}
                      </ul>

                      <h4>Attachments</h4>
                      <ul className={styles.reviewAttachments}>
                        {formState.attachments.length === 0 && <li>None provided</li>}
                        {formState.attachments.map((attachment, index) => (
                          <li key={`${attachment.name}-${index}`}>{attachment.name}</li>
                        ))}
                      </ul>

                      <h4>Notifications</h4>
                      <p>{formState.notifyManager ? 'Manager will be notified automatically.' : 'Manager notification skipped.'}</p>

                      {validationState.review && !reviewValid && (
                        <p className={styles.error}>Resolve validation items in previous steps before submitting.</p>
                      )}
                    </div>
                  )}

                  <footer className={styles.formActions}>
                    <div className={styles.actionsLeft}>
                      <button type="button" className={styles.tertiaryButton} onClick={goToPreviousStep} disabled={currentStep === 0}>
                        Back
                      </button>
                      {currentStep < steps.length - 1 && (
                        <button type="button" className={styles.primaryButton} onClick={goToNextStep}>
                          Continue
                        </button>
                      )}
                      {currentStep === steps.length - 1 && (
                        <button type="submit" className={styles.primaryButton} disabled={submitMutation.isPending}>
                          {submitMutation.isPending ? 'Submitting…' : 'Submit request'}
                        </button>
                      )}
                    </div>
                    <div>
                      <button type="button" className={styles.tertiaryButton} onClick={handleStartNewRequest}>
                        Reset form
                      </button>
                    </div>
                  </footer>

                  {submitMutation.isError && (
                    <p className={styles.error} role="alert">
                      Unable to submit request. Try again or contact the operations desk if the issue persists.
                    </p>
                  )}
                </form>
              )}

              <section className={styles.slaSummary}>
                <h3>SLA & readiness</h3>
                {selectedWorkflow ? (
                  <ul>
                    <li>
                      <span>SLA target</span>
                      <strong>{selectedService.slaHours} hours</strong>
                    </li>
                    <li>
                      <span>Current queue</span>
                      <strong>{selectedWorkflow.queueDepth} requests</strong>
                    </li>
                    <li>
                      <span>Breach rate</span>
                      <strong>{selectedWorkflow.breachedPercent}%</strong>
                    </li>
                    <li>
                      <span>Avg completion</span>
                      <strong>{selectedWorkflow.avgCompletionHours} hours</strong>
                    </li>
                    <li>
                      <span>Trend</span>
                      <strong>{describeTrend(selectedWorkflow.backlogTrend)}</strong>
                    </li>
                  </ul>
                ) : (
                  <p>No telemetry linked to this service yet.</p>
                )}
                <p className={styles.checklistTitle}>Checklist before submitting</p>
                <ul className={styles.checklist}>
                  {selectedService.intakeChecklist.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.knowledgeSection}>
                <h3>Knowledge suggestions</h3>
                <ul>
                  {recommendedArticles.map((article: KnowledgeArticle) => (
                    <li key={article.id}>
                      <span className={styles.knowledgeTitle}>{article.title}</span>
                      <p>{article.summary}</p>
                      <span className={styles.knowledgeMeta}>Updated {formatRelative(article.updatedAt)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
            <div className={styles.emptyIntake}>
              <h2>Select a service to begin</h2>
              <p>The catalog includes technology, HR, finance, and operations workflows with guided intake and SLA guardrails.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
