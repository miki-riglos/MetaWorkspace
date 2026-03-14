'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { TabInfo } from './WorkspaceContext';
import { View } from '@/client-metadata/View';
import { useModule } from './ModuleContext';

import { Module } from '@/client-metadata/Module';

interface ViewContextType {
  $module: Module;
  view: View;
  tabInfo: TabInfo;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { $module } = useModule();

  const view = useMemo(() => {
    if (!$module || !tabInfo.viewName) return undefined;
    return $module.views.find(v => v.name === tabInfo.viewName);
  }, [$module, tabInfo.viewName]);

  const value = useMemo(() => ({
    $module,
    view,
    tabInfo
  }), [$module, tabInfo, view]);

  if (!view) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading View...</div>
      </div>
    );
  }

  return (
    <ViewContext.Provider value={value as ViewContextType}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
