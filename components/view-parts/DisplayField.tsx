import React from 'react';
import { ViewPartComponent } from '../types';
import { ModelRecord } from '@/types';

export const DisplayField: ViewPartComponent = ({ partConfig, data }) => {
  const value = (data as ModelRecord)?.[partConfig.propertyName!] ?? '-';
  const displayValue = value;
  return <span>{displayValue}</span>;
};
