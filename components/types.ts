import React from 'react';
import { ModelRecord } from '@/types';
import { ViewPartConfig } from '@/client-metadata/View';

// View
export interface ViewParams {
  idValues?: ModelRecord;
}

export interface ViewComponentProps {
  viewParams: ViewParams;
}

export type ViewComponent = React.ComponentType<ViewComponentProps>;

// ViewPart
export interface ViewPartComponentProps {
  partConfig: ViewPartConfig;
  data: ModelRecord[] | ModelRecord;
};

export type ViewPartComponent = React.ComponentType<ViewPartComponentProps>;
