import React from 'react';
import { ViewPartComponent } from '../types';

export const Label: ViewPartComponent = ({ part }) => (
  <div className="text-sm font-medium text-gray-700 mb-1">
    {part.label ?? '-'}
  </div>
);
