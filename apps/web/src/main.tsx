import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AppProviders } from './providers/AppProviders';
import { routes } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/global.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppProviders>
  </React.StrictMode>
);
