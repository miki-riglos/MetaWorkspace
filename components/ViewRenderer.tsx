'use client';

import React, { useMemo } from 'react';
import { viewRegistry } from '@/registries/viewRegistry';
import { ViewComponentProps } from './types';
import { useView } from '@/contexts/ViewContext';

export function ViewRenderer(props: ViewComponentProps) {
  const { view } = useView();
  const ViewComponent = useMemo(() => viewRegistry.get(view.viewType), [view.viewType]);

  if (!ViewComponent) {
    return <div className="p-4 text-red-500">View component {view.viewType} not found in registry.</div>;
  }

  return React.createElement(ViewComponent, { ...props });
}
