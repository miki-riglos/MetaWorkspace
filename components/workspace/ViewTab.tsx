'use client';

import React from 'react';
import { ViewRenderer } from '../ViewRenderer';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { ViewProvider } from '@/contexts/ViewContext';

interface ViewTabProps {
  tabInfo: TabInfo;
}

export function ViewTab({ tabInfo }: ViewTabProps) {
  return (
    <ViewProvider tabInfo={tabInfo}>
      <ViewRenderer viewParams={{}} />
    </ViewProvider>
  );
}
