'use client';

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { TabInfo } from './WorkspaceContext';
import { Module } from '@/client-metadata/Module';
import { useTenant } from './TenantContext';
import { ConfigService } from '@/services/ConfigService';

import { Tenant } from '@/client-metadata/Tenant';

interface ModuleContextType {
  tenant: Tenant;
  $module: Module;
  tabInfo: TabInfo;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { tenant } = useTenant();
  const [moduleConfig, setModuleConfig] = useState<Module | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchModule = async () => {
      if (!tenant || !tabInfo.moduleName) return;
      try {
        const m = await ConfigService.getModule(tenant.id, tabInfo.moduleName);
        if (isMounted) {
          setModuleConfig(m);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch module:', error);
        if (isMounted) setLoading(false);
      }
    };
    fetchModule();
    return () => { isMounted = false; };
  }, [tenant, tabInfo.moduleName]);

  const value = useMemo(() => ({
    tenant,
    $module: moduleConfig,
    tabInfo
  }), [tenant, tabInfo, moduleConfig]);

  if (loading || !moduleConfig) {
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
