import React from 'react';
import { ViewPartComponent } from './types';

export const Card: ViewPartComponent = ({ props, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
    {(props.title || props.subtitle) && (
      <div className="p-6 border-b border-gray-100">
        {props.title && <h3 className="text-lg font-bold text-gray-900">{props.title}</h3>}
        {props.subtitle && <p className="text-sm text-gray-500">{props.subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);
