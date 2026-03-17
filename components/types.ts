import React from 'react';
import { ModelRecord } from '@/types';
import { ViewPart } from '@/infrastructure/ViewPart';

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
  part: ViewPart;
  data: ModelRecord[] | ModelRecord;
};

export type ViewPartComponent = React.ComponentType<ViewPartComponentProps>;
