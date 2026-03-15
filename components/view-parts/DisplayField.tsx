import React from 'react';
import { ViewPartComponent } from '../types';

export const DisplayField: ViewPartComponent = ({ partConfig, record }) => {
  let displayValue = record?.[partConfig.propertyName!] ?? '-';

  // Resolve dot-notation properties if standard value resolution didn't catch it
  if (displayValue === undefined && record && partConfig.propertyName?.includes('.')) {
    displayValue = partConfig.propertyName.split('.').reduce((obj: any, key: string) => obj?.[key], record);
  }

  if (displayValue === null || displayValue === undefined) {
    return null;
  }

  // Fallback for nested objects
  if (typeof displayValue === 'object') {
    return <span>{JSON.stringify(displayValue)}</span>;
  }

  return <span>{String(displayValue)}</span>;
};
