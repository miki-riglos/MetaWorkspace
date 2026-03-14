'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ViewInit } from '@/metadata/View';
import { ModelConfig } from '@/metadata/Model';
import { ViewPartRenderer } from './ViewPartRenderer';
import { RefreshCw, Save } from 'lucide-react';

interface DetailViewProps {
  viewConfig: ViewInit;
  tenantId: string;
  moduleName: string;
  modelDef?: ModelConfig;
  idValues: Record<string, any>;
}

export function DetailView({ viewConfig, tenantId, moduleName, modelDef, idValues }: DetailViewProps) {
  const [record, setRecord] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Find properties marked as isId
      const idProperties = modelDef?.properties?.filter(p => p.isId) || [];
      const idKeys = idProperties.map(p => p.name);

      if (idKeys.length === 0 && Object.keys(idValues).length === 0) {
        setRecord({});
        setLoading(false);
        return;
      }

      // Use provided idValues or fallback to first record if no idValues
      const res = await fetch(`/api/${tenantId}/${moduleName}/${viewConfig.modelName}`);
      const json = await res.json();
      
      let found;
      if (Array.isArray(json)) {
        if (Object.keys(idValues).length > 0) {
          found = json.find((item: any) => 
            Object.keys(idValues).every(key => String(item[key]) === String(idValues[key]))
          );
        } else {
          found = json[0]; // Default to first record if no specific ID provided
        }
      }
      
      setRecord(found || {});
    } catch (e) {
      console.error('Failed to fetch record', e);
    } finally {
      setLoading(false);
    }
  }, [tenantId, moduleName, viewConfig.modelName, idValues, modelDef?.properties]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    // Implementation for saving changes
    console.log('Saving record:', record);
  };

  const handleRecordChange = (propertyName: string, value: any) => {
    setRecord((prev: any) => ({ ...prev, [propertyName]: value }));
  };

  if (loading) return <div className="p-8 animate-pulse text-gray-400">Loading detail view...</div>;

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
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
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
              record={record}
              onRecordChange={handleRecordChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
