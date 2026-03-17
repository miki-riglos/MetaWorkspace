import React from 'react';
import { ViewPartComponent } from '../types';
import { DataGrid } from './DataGrid';
import { ModelRecord } from '@/types';

export const RelationGrid: ViewPartComponent = ({ part, data }) => {
  const rows = (data as ModelRecord)?.[part.propertyName!] ?? [];
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-700">{part.label ?? 'Related Records'}</h4>
      </div>
      <DataGrid part={part} data={rows} />
    </div>
  );
};
