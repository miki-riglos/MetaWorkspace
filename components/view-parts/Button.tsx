import React from 'react';
import { ViewPartComponent } from '../types';

export const Button: ViewPartComponent = ({ props }) => (
  <button
    onClick={props.onClick}
    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
  >
    {props.label || 'Button'}
  </button>
);
