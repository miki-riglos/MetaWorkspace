'use client';

import React, { useMemo } from 'react';
import { viewPartRegistry } from '@/registries/viewPartRegistry';
import { ViewPartComponentProps } from './types';

export function ViewPartRenderer(props: ViewPartComponentProps) {
  const ViewPartComponent = useMemo(() => viewPartRegistry.get(props.partConfig.componentName), [props.partConfig.componentName]);

  if (!ViewPartComponent) {
    return <div className="p-4 text-red-500">View Part component {props.partConfig.componentName} not found in registry.</div>;
  }

  return React.createElement(ViewPartComponent, { ...props });
}
