'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TabInfo } from './WorkspaceContext';
import { useTenant } from './TenantContext';
import { Module } from '@/infrastructure/client/Module';

interface ModuleContextType {
  module: Module;
  tabInfo: TabInfo;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { tenant } = useTenant();
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<Module | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    const getModule = async () => {
      try {
        const tenantModule = await tenant.getModule(tabInfo.moduleName!);
        if (isMounted) {
          setModule(tenantModule);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load module:', error);
        if (isMounted) setLoading(false);
      }
    };
    getModule();
    return () => { isMounted = false; };
  }, [tenant, tabInfo.moduleName]);

  const context = useMemo<ModuleContextType>(() => ({
    module: module!,
    tabInfo
  }), [tabInfo, module]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading Module...</div>
      </div>
    );
  }

  return (
    <ModuleContext.Provider value={context}>
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
