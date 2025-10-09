import { RouteObject } from 'react-router-dom';

import { Layout } from './features/layout/Layout';
import { AdaptiveHome } from './features/widgets/AdaptiveHome';
import { Directory } from './features/directory/Directory';
import { KnowledgeHub } from './features/knowledge/KnowledgeHub';
import { ServiceHub } from './features/serviceHub/ServiceHub';
import { AnalyticsConsole } from './features/analytics/AnalyticsConsole';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdaptiveHome />
      },
      {
        path: 'directory',
        element: <Directory />
      },
      {
        path: 'knowledge',
        element: <KnowledgeHub />
      },
      {
        path: 'analytics',
        element: <AnalyticsConsole />
      },
      {
        path: 'service-hub',
        element: <ServiceHub />
      }
    ]
  }
];
