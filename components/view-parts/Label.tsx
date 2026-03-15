import React from 'react';
import { ViewPartComponent } from '../types';

export const Label: ViewPartComponent = ({ partConfig }) => (
  <div className="text-sm font-medium text-gray-700 mb-1">
    {partConfig.label ?? '-'}
  </div>
);
