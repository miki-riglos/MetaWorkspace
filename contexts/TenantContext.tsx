'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { TabInfo } from './WorkspaceContext';
import { Tenant } from '@/infrastructure/client/Tenant';
import { useAuth } from './AuthContext';

interface TenantContextType {
  tenant: Tenant;
  tabInfo: TabInfo;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { user } = useAuth();

  const tenant = useMemo(() => {
    return user?.tenants.find(t => t.id === tabInfo.tenantId);
  }, [user, tabInfo.tenantId]);

  const context = useMemo<TenantContextType>(() => ({
    tenant: tenant!,
    tabInfo
  }), [tabInfo, tenant]);

  return (
    <TenantContext.Provider value={context}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
