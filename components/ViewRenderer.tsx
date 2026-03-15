'use client';

import React, { useMemo } from 'react';
import { viewRegistry } from '@/registries/viewRegistry';
import { ViewComponentProps } from './types';

export function ViewRenderer(props: ViewComponentProps) {
  const ViewComponent = useMemo(() => viewRegistry.get(props.view.viewType), [props.view.viewType]);

  if (!ViewComponent) {
    return <div className="p-4 text-red-500">View component {props.view.viewType} not found in registry.</div>;
  }

  return React.createElement(ViewComponent, { ...props });
}
