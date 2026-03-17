import React from 'react';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';

export const Card: ViewPartComponent = ({ part, data }) => (
  <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
    {(part.options?.title || part.options?.subtitle) && (
      <div className="p-6 border-b border-gray-100">
        {part.options?.title && <h3 className="text-lg font-bold text-gray-900">{part.options.title}</h3>}
        {part.options?.subtitle && <p className="text-sm text-gray-500">{part.options.subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {part.children?.map((child, index) => (
        <ViewPartRenderer
          key={index}
          part={child}
          data={data}
        />
      ))}
    </div>
  </div>
);
