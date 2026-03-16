import React from 'react';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';

export const Card: ViewPartComponent = ({ partConfig, data }) => (
  <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
    {(partConfig.options?.title || partConfig.options?.subtitle) && (
      <div className="p-6 border-b border-gray-100">
        {partConfig.options?.title && <h3 className="text-lg font-bold text-gray-900">{partConfig.options.title}</h3>}
        {partConfig.options?.subtitle && <p className="text-sm text-gray-500">{partConfig.options.subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {partConfig.children?.map((child, index) => (
        <ViewPartRenderer
          key={index}
          partConfig={child}
          data={data}
        />
      ))}
    </div>
  </div>
);
