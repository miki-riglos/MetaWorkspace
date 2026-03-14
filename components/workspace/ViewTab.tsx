'use client';

import React from 'react';
import { ViewRenderer } from '../ViewRenderer';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { ViewProvider, useView } from '@/contexts/ViewContext';
import { useModule } from '@/contexts/ModuleContext';

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
  const { $module } = useModule();

  return (
    <ViewRenderer
      viewConfig={view}
      tenantId={tabInfo.tenantId}
      moduleName={tabInfo.moduleName!}
      $module={$module}
    />
  );
}
