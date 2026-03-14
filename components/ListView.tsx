'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ViewInit } from '@/metadata/View';
import { ModelConfig } from '@/metadata/Model';
import { ViewPartRenderer } from './ViewPartRenderer';
import { Plus, RefreshCw } from 'lucide-react';

interface ListViewProps {
  viewConfig: ViewInit;
  tenantId: string;
  moduleName: string;
  modelDef?: ModelConfig;
}

export function ListView({ viewConfig, tenantId, moduleName, modelDef }: ListViewProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tenantId}/${moduleName}/${viewConfig.modelName}`);
      const json = await res.json();
      if (Array.isArray(json)) {
        setData(json);
      } else {
        console.error('API returned non-array data:', json);
        setData([]);
      }
    } catch (e) {
      console.error('Failed to fetch data', e);
    } finally {
      setLoading(false);
    }
  }, [tenantId, moduleName, viewConfig.modelName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddRecord = async () => {
    try {
      const res = await fetch(`/api/${tenantId}/${moduleName}/${viewConfig.modelName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error('Failed to add record', e);
    }
  };

  if (loading) return <div className="p-8 animate-pulse text-gray-400">Loading list view...</div>;

  return (
    <div className="p-6 h-full overflow-auto bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{viewConfig.label}</h2>
            <p className="text-sm text-gray-500">Model: {viewConfig.modelName}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button 
              onClick={handleAddRecord}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        </header>
        <div className="space-y-6">
          {viewConfig.parts.map(part => (
            <ViewPartRenderer
              key={part.id}
              part={part}
              tenantId={tenantId}
              moduleName={moduleName}
              modelDef={modelDef}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
