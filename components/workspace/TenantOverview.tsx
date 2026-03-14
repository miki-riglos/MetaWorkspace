'use client';

import React from 'react';
import { Database } from 'lucide-react';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { useTenant } from '@/contexts/TenantContext';

interface TenantOverviewProps {
  tabInfo: TabInfo;
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
}

export function TenantOverview({ tabInfo, openTab }: TenantOverviewProps) {
  const { tenant } = useTenant();

  return (
    <div className="p-12 flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{tabInfo.title}</h2>
      <p className="text-gray-500 mt-2">Tenant Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl w-full">
        {tenant?.moduleStubs.map((m: any) => (
          <button
            key={m.name}
            onMouseDown={() => openTab({
              tabType: 'module',
              title: m.label,
              parentId: tabInfo.id,
              tenantId: tabInfo.tenantId,
              moduleName: m.name
            })}
            className="p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:border-indigo-500/20 transition-all text-left group"
          >
            <div className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{m.label}</div>
            <div className="text-xs text-gray-400 mt-1">{m.views?.length || 0} Views</div>
          </button>
        ))}
      </div>
    </div>
  );
}
