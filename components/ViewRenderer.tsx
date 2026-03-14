'use client';

import React, { useMemo } from 'react';
import { View } from '@/client-metadata/View';
import { viewRegistry } from '@/registries/viewRegistry';
import { TabInfo } from '@/contexts/WorkspaceContext';

interface ViewRendererProps {
  tabInfo: TabInfo;
  view: View;
  idValues?: Record<string, any>;
}

export function ViewRenderer({ tabInfo, view, idValues }: ViewRendererProps) {
  const ViewComponent = useMemo(() => viewRegistry.get(view.viewType), [view.viewType]);

  if (!ViewComponent) {
    return <div className="p-4 text-red-500">View type {view.viewType} not found in registry.</div>;
  }

  return React.createElement(ViewComponent, {
    view,
    idValues: idValues ?? {}
  });
}
