import React from 'react';
import { ViewPartComponent } from '../types';

export const InputField: ViewPartComponent = ({ props, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    {props.label && <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{props.label}</label>}
    <input
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
    />
  </div>
);
