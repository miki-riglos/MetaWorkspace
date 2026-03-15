'use client';

import React from 'react';
import { Box } from 'lucide-react';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { useModule } from '@/contexts/ModuleContext';

interface ModuleOverviewProps {
  tabInfo: TabInfo;
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
}

export function ModuleOverview({ tabInfo, openTab }: ModuleOverviewProps) {
  const { module: $module } = useModule();

  return (
    <div className="p-12 flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center mb-6">
        <Box className="w-8 h-8 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{tabInfo.title}</h2>
      <p className="text-gray-500 mt-2">Module Overview for {tabInfo.moduleName}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl w-full">
        {$module?.views?.map((v: any) => (
          <button
            key={v.name}
            onClick={() => openTab({
              tabType: 'view',
              title: v.label,
              parentId: tabInfo.id,
              tenantId: tabInfo.tenantId,
              moduleName: tabInfo.moduleName,
              viewName: v.name
            })}
            className="p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:border-indigo-500/20 transition-all text-left group"
          >
            <div className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{v.label}</div>
            <div className="text-xs text-gray-400 mt-1">{v.viewType} View</div>
          </button>
        ))}
      </div>
    </div>
  );
}
