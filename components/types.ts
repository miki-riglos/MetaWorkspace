import { View, ViewPartConfig } from '@/client-metadata/View';
import React from 'react';

// View
export interface ViewParams {
  idValues?: Record<string, any>;
}

export interface ViewComponentProps {
  viewParams: ViewParams;
}

export type ViewComponent = React.ComponentType<ViewComponentProps>;

// ViewPart
export interface ViewPartComponentProps {
  partConfig: ViewPartConfig;
  data: any;
};

export type ViewPartComponent = React.ComponentType<ViewPartComponentProps>;
