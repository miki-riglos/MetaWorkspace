import { View } from '@/client-metadata/View';
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
  props: any;
  data?: any[];
  value?: any;
  onChange?: (v: any) => void;
  children?: React.ReactNode;
};

export type ViewPartComponent = React.ComponentType<ViewPartComponentProps>;
