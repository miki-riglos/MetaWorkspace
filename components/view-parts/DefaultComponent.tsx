import React from 'react';
import { Info } from 'lucide-react';
import { ViewPartComponent } from '../types';

export const DefaultComponent: ViewPartComponent = ({ props, children }) => (
  <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
    <div className="flex items-center gap-2 text-gray-500 mb-2">
      <Info className="w-4 h-4" />
      <span className="text-xs font-medium uppercase tracking-wider">Default Component</span>
    </div>
    <div className="text-sm text-gray-600">
      {props?.label || 'Generic Container'}
    </div>
    {children && <div className="mt-4">{children}</div>}
  </div>
);
