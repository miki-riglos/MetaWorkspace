'use client';

import React, { useMemo } from 'react';
import { viewPartRegistry } from '@/registries/viewPartRegistry';
import { ViewPartComponentProps } from './types';

export function ViewPartRenderer({ part: partConfig, data }: ViewPartComponentProps) {
  const ViewPartComponent = useMemo(() => viewPartRegistry.get(partConfig.componentName), [partConfig.componentName]);

  if (!ViewPartComponent) {
    return <div className="p-4 text-red-500">View Part component {partConfig.componentName} not found in registry.</div>;
  }

  return React.createElement(ViewPartComponent, { part: partConfig, data });
}
