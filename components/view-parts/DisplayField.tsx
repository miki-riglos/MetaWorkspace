import React from 'react';
import { ViewPartComponent } from '../types';
import { ModelRecord } from '@/infrastructure/types';

export const DisplayField: ViewPartComponent = ({ part, data }) => {
  const value = (data as ModelRecord)?.[part.propertyName!] ?? '-';
  const displayValue = value;
  return <span>{displayValue}</span>;
};
