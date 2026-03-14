'use client';

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { TabInfo } from './WorkspaceContext';
import { Tenant } from '@/client-metadata/Tenant';
import { ConfigService } from '@/services/ConfigService';
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
  const [tenant, setTenant] = useState<Tenant | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTenant = async () => {
      try {
        const t = await ConfigService.getTenant(tabInfo.tenantId);
        if (isMounted) {
          setTenant(t);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch tenant:', error);
        if (isMounted) setLoading(false);
      }
    };
    fetchTenant();
    return () => { isMounted = false; };
  }, [tabInfo.tenantId]);

  const value = useMemo(() => ({
    user,
    tenant,
    tabInfo
  }), [user, tabInfo, tenant]);

  if (loading) {
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
