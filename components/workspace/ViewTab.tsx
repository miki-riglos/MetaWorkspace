'use client';

import React from 'react';
import { ViewRenderer } from '../ViewRenderer';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { ViewProvider, useView } from '@/contexts/ViewContext';

interface ViewTabProps {
  tabInfo: TabInfo;
}

export function ViewTab({ tabInfo }: ViewTabProps) {
  return (
    <ViewProvider tabInfo={tabInfo}>
      <ViewTabContent tabInfo={tabInfo} />
    </ViewProvider>
  );
}

function ViewTabContent({ tabInfo }: ViewTabProps) {
  const { view } = useView();
  return <ViewRenderer tabInfo={tabInfo} view={view} />;
}
