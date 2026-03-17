import React from 'react';
import { ViewPartComponent } from '../types';
import { ModelRecord } from '@/types';

export const InputField: ViewPartComponent = ({ part, data }) => {
  const value = (data as ModelRecord)?.[part.propertyName!] ?? '';
  return (
    <div className="flex flex-col gap-1.5">
      {part.label && <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{part.label}</label>}
      <input
        value={value}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
      />
    </div>
  );
}
