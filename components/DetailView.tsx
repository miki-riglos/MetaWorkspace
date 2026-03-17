'use client';

import React, { useEffect, useCallback } from 'react';
import { ViewPartRenderer } from './ViewPartRenderer';
import { RefreshCw } from 'lucide-react';
import { ViewComponentProps } from './types';
import { DetailViewContextType, useView } from '@/contexts/ViewContext';

export function DetailView({ viewParams }: ViewComponentProps) {
  const { view, isLoading, setIsLoading, record, setRecord } = useView<DetailViewContextType>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Find properties marked as isId
      const idProperties = view.model.properties?.filter(p => p.isId) ?? [];
      const idKeys = idProperties.map(p => p.name);

      if (idKeys.length === 0 && Object.keys(viewParams.idValues ?? {}).length === 0) {
        setRecord({});
        setIsLoading(false);
        return;
      }

      const record = await view.module.dataService.getRecord(view.module.name, view.model.name, Object.values(viewParams.idValues!).join('++'));
      setRecord(record || {});

    } catch (e) {
      console.error('Failed to fetch record', e);
    } finally {
      setIsLoading(false);
    }
  }, [view, viewParams.idValues]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <div className="p-8 animate-pulse text-gray-400">Loading detail view...</div>;

  return (
    <div className="p-6 h-full overflow-auto bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{view.label}</h2>
            <p className="text-sm text-gray-500">Model: {view.model.name}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>
        <div className="space-y-6">
          {view.parts.map((part, index) => (
            <ViewPartRenderer
              key={index}
              part={part}
              data={record}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
