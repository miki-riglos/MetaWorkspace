import React from 'react';
import { ViewPartComponent } from './types';
import { DataGrid } from './DataGrid';

export const RelationGrid: ViewPartComponent = ({ props, value, data }) => {
  // If value is provided (nested array), use it. Otherwise, we might need to fetch.
  // For now, assume the data is passed in via 'value' (from the record's property)
  const displayData = value || data || [];
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-700">{props.label || 'Related Records'}</h4>
      </div>
      <DataGrid props={props} value={displayData} />
    </div>
  );
};
