import React from 'react';
import { ModelRecord } from '@/types';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';
import { ViewPart } from '@/infrastructure/ViewPart';

export const DataGrid: ViewPartComponent = ({ part, data }) => {
  const records = data ?? [];
  const childPartConfigs = part.children ?? [];

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {childPartConfigs.map((childPartConfig: ViewPart, index: number) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {childPartConfig.label ?? childPartConfig.propertyName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record: ModelRecord, i: number) => (
            <tr key={i}>
              {childPartConfigs.map((childPartConfig: ViewPart, index: number) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <ViewPartRenderer part={childPartConfig} data={record} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
