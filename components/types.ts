import { View, ViewPartConfig } from '@/client-metadata/View';
import React from 'react';

// View
export interface ViewComponentProps {
  view: View;
  idValues?: Record<string, any>;
}

export type ViewComponent = React.ComponentType<ViewComponentProps>;

// ViewPart
export interface ViewPartComponentProps {
  view: View;
  partConfig: ViewPartConfig;
  data?: any[];
  record?: any;
};

export type ViewPartComponent = React.ComponentType<ViewPartComponentProps>;
