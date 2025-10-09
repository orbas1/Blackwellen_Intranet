#!/usr/bin/env bash
set -euo pipefail

# Security Scan Orchestrator for Version 1.50
# Executes dependency, container, IaC, and secret scanning across the mono-repo.
# Designed for CI but can be triggered locally with the required CLIs installed.

ROOT_DIR="$(git rev-parse --show-toplevel)"
REPORT_DIR="$ROOT_DIR/update_docs/1.50/update_tests/reports/security"
mkdir -p "$REPORT_DIR"

log() {
  printf "[%s] %s\n" "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$1"
}

command -v snyk >/dev/null 2>&1 || { echo "Snyk CLI is required" >&2; exit 1; }
command -v trivy >/dev/null 2>&1 || { echo "Trivy CLI is required" >&2; exit 1; }
command -v gitleaks >/dev/null 2>&1 || { echo "Gitleaks CLI is required" >&2; exit 1; }

log "Bootstrapping npm dependencies for workspace scan"
(cd "$ROOT_DIR/apps/web" && npm ci --include=dev)

log "Running npm audit"
npm --prefix "$ROOT_DIR/apps/web" audit --json > "$REPORT_DIR/web_npm_audit.json" || true

log "Executing Snyk test for web workspace"
snyk test "$ROOT_DIR/apps/web" --all-projects --json-file-output "$REPORT_DIR/web_snyk_report.json" || true

log "Running composer audit on backend API"
if [ -d "$ROOT_DIR/services/api" ]; then
  (cd "$ROOT_DIR/services/api" && composer install --no-interaction --prefer-dist && composer audit --format=json > "$REPORT_DIR/backend_composer_audit.json" || true)
else
  log "Backend repository not present; skipping composer audit"
fi

log "Scanning IaC manifests with Snyk IaC"
snyk iac test "$ROOT_DIR/infrastructure" --report --json-file-output="$REPORT_DIR/iac_snyk_report.json" || true

log "Running Trivy on container definitions"
trivy config "$ROOT_DIR" --format json --output "$REPORT_DIR/trivy_config_report.json" || true

log "Executing Trivy filesystem scan for critical vulnerabilities"
trivy fs "$ROOT_DIR" --severity CRITICAL,HIGH --format json --output "$REPORT_DIR/trivy_fs_report.json" || true

log "Scanning git history for secrets with gitleaks"
gitleaks detect --source "$ROOT_DIR" --report-path "$REPORT_DIR/gitleaks_report.json" --report-format json || true

log "Security scan orchestration completed. Reports available under $REPORT_DIR"
