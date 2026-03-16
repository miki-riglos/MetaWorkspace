import React from 'react';
import { ViewPartComponent } from '../types';
import { ViewPartRenderer } from '../ViewPartRenderer';

export const DataGrid: ViewPartComponent = ({ partConfig, data }) => {
  const rows = data ?? [];
  const childPartConfigs = partConfig.children ?? [];

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {childPartConfigs.map((childPartConfig: any, index: number) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {childPartConfig.label ?? childPartConfig.propertyName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row: any, i: number) => (
            <tr key={i}>
              {childPartConfigs.map((childPartConfig: any, index: number) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <ViewPartRenderer partConfig={childPartConfig} data={row} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
