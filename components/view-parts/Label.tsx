import React from 'react';
import { ViewPartComponent } from './types';

export const Label: ViewPartComponent = ({ props }) => (
  <div className="text-sm font-medium text-gray-700 mb-1">
    {props.label || props.text}
  </div>
);
