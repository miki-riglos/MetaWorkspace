'use client';

import React, { useMemo } from 'react';
import { ViewConfig } from '@/metadata/View';
import { viewRegistry } from '@/registries/viewRegistry';

interface ViewRendererProps {
  viewConfig: ViewConfig;
  tenantId: string;
  moduleName: string;
  $module?: any;
  idValues?: Record<string, any>;
}

export function ViewRenderer({ viewConfig, tenantId, moduleName, $module, idValues }: ViewRendererProps) {
  const modelDef = $module?.models?.find((m: any) => m.name === viewConfig.modelName);
  const ViewComponent = useMemo(() => viewRegistry.get(viewConfig.viewType), [viewConfig.viewType]);

  if (!ViewComponent) {
    return <div className="p-4 text-red-500">View type {viewConfig.viewType} not found in registry.</div>;
  }

  return React.createElement(ViewComponent, {
    viewConfig,
    tenantId,
    moduleName,
    modelDef,
    idValues: idValues || {}
  });
}
