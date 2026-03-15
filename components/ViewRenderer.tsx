'use client';

import React, { useMemo } from 'react';
import { viewRegistry } from '@/registries/viewRegistry';
import { ViewComponentProps } from './types';

export function ViewRenderer({ view, idValues }: ViewComponentProps) {
  const ViewComponent = useMemo(() => viewRegistry.get(view.viewType), [view.viewType]);

  if (!ViewComponent) {
    return <div className="p-4 text-red-500">View type {view.viewType} not found in registry.</div>;
  }

  return React.createElement(ViewComponent, {
    view,
    idValues: idValues ?? {}
  });
}
