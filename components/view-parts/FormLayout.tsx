import React from 'react';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';

export const FormLayout: ViewPartComponent = ({ partConfig, data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm border border-black/5">
    {partConfig.children?.map((childPartConfig, index) => (
      <ViewPartRenderer
        key={index}
        partConfig={childPartConfig}
        data={data}
      />
    ))}
  </div>
);
