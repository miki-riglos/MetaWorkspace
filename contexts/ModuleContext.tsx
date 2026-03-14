'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { TabInfo } from './WorkspaceContext';
import { Module } from '@/client-metadata/Module';
import { useTenant } from './TenantContext';

import { Tenant } from '@/client-metadata/Tenant';

interface ModuleContextType {
  tenant: Tenant;
  $module: Module;
  tabInfo: TabInfo;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { tenant } = useTenant();

  const moduleConfig = useMemo(() => {
    if (!tenant || !tabInfo.moduleName) return undefined;
    return tenant.modules.find(m => m.name === tabInfo.moduleName);
  }, [tenant, tabInfo.moduleName]);

  const value = useMemo(() => ({
    tenant,
    $module: moduleConfig,
    tabInfo
  }), [tenant, tabInfo, moduleConfig]);

  if (!moduleConfig) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading Module...</div>
      </div>
    );
  }

  return (
    <ModuleContext.Provider value={value as ModuleContextType}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
}
