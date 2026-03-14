'use client';

import React from 'react';
import { Registry } from '@/lib/Registry';
import { ListView } from '@/components/ListView';
import { DetailView } from '@/components/DetailView';

export interface ViewComponentProps {
  viewConfig: any;
  tenantId: string;
  moduleName: string;
  modelDef?: any;
  idValues?: Record<string, any>;
}

export type ViewComponent = React.ComponentType<ViewComponentProps>;

export const viewRegistry = new Registry<ViewComponent>();

// Register standard views
viewRegistry.register('LIST', ListView as ViewComponent);
viewRegistry.register('DETAIL', DetailView as ViewComponent);
