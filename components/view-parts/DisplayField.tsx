import React from 'react';
import { ViewPartComponent } from '../types';

export const DisplayField: ViewPartComponent = ({ partConfig, data }) => {
  const displayValue = data?.[partConfig.propertyName!] ?? '-';
  return <span>{displayValue}</span>;
};
