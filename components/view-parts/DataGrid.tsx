import React from 'react';
import { ViewPartComponent } from '../types';

export const DataGrid: ViewPartComponent = ({ props, data, value }) => {
  const displayData = data || value || [];
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {props.columns?.map((col: any) => (
              <th key={col.field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayData.map((row: any, i: number) => (
            <tr key={i}>
              {props.columns?.map((col: any) => (
                <td key={col.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.field.includes('.')
                    ? col.field.split('.').reduce((obj: any, key: string) => obj?.[key], row)
                    : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
