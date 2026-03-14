'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { TabInfo } from './WorkspaceContext';
import { Tenant } from '@/client-metadata/Tenant';
import { useAuth } from './AuthContext';

import { User } from '@/client-metadata/User';

interface TenantContextType {
  user: User | null;
  tenant: Tenant;
  tabInfo: TabInfo;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { user } = useAuth();

  const tenant = useMemo(() => {
    if (!user) return undefined;
    const stub = user.tenantStubs.find(s => s.id === tabInfo.tenantId);
    if (!stub) {
      console.error(`Tenant stub not found for ID: ${tabInfo.tenantId}`);
      return undefined;
    }
    return new Tenant(stub);
  }, [user, tabInfo.tenantId]);

  const value = useMemo(() => ({
    user,
    tenant,
    tabInfo
  }), [user, tabInfo, tenant]);

  if (!user || !tenant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <TenantContext.Provider value={value as TenantContextType}>
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
