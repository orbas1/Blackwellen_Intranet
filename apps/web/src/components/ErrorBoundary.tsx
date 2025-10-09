import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Unhandled UI error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <section role="alert" style={{ padding: '1.5rem' }}>
            <h1>Something went wrong</h1>
            <p>We have logged the error and our team is investigating. Try refreshing your browser.</p>
          </section>
        )
      );
    }

    return this.props.children;
  }
}
