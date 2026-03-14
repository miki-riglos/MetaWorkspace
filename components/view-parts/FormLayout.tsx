import React from 'react';
import { ViewPartComponent } from './types';

export const FormLayout: ViewPartComponent = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm border border-black/5">
    {children}
  </div>
);
