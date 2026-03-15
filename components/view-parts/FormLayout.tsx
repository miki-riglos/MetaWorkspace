import React from 'react';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';

export const FormLayout: ViewPartComponent = ({ view, partConfig, record, data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm border border-black/5">
    {partConfig.children?.map((child, index) => (
      <ViewPartRenderer
        key={index}
        view={view}
        partConfig={child}
        record={record}
        data={data}
      />
    ))}
  </div>
);
