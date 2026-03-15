import React from 'react';
import { ViewPartComponent } from '../types';
import { DataGrid } from './DataGrid';

export const RelationGrid: ViewPartComponent = ({ view, partConfig, record, data }) => {
  // If value is provided (nested array), use it. Otherwise, we might need to fetch.
  // For now, assume the data is passed in via 'value' (from the record's property)
  const displayData = record?.[partConfig.propertyName!] ?? data ?? [];

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-700">{partConfig.label ?? 'Related Records'}</h4>
      </div>
      <DataGrid view={view} partConfig={partConfig} record={record} data={displayData} />
    </div>
  );
};
