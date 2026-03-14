'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Layout } from 'lucide-react';
import { TabInfo, useWorkspace } from '@/contexts/WorkspaceContext';
import { ConfigService } from '@/services/ConfigService';
import { Module } from '@/client-metadata/Module';

interface AddMenuProps {
  addMenu: { id: string, x: number, y: number, type: 'tenant' | 'module' } | null;
  setAddMenu: (menu: { id: string, x: number, y: number, type: 'tenant' | 'module' } | null) => void;
  tabInfos: TabInfo[];
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
}

export function AddMenu({
  addMenu,
  setAddMenu,
  tabInfos,
  openTab
}: AddMenuProps) {
  const { tenants } = useWorkspace();
  const addMenuRef = useRef<HTMLDivElement>(null);
  const [$module, set$module] = useState<Module | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setAddMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setAddMenu]);

  useEffect(() => {
    let isMounted = true;
    if (addMenu?.type === 'module') {
      const tabInfo = tabInfos.find(t => t.id === addMenu.id);
      if (tabInfo?.moduleName) {
        ConfigService.getModule(tabInfo.tenantId, tabInfo.moduleName)
          .then(m => {
            if (isMounted) set$module(m);
          })
          .catch(err => console.error('Failed to fetch module for AddMenu:', err));
      }
    }

    return () => {
      isMounted = false;
      set$module(null);
    };
  }, [addMenu, tabInfos]);

  if (!addMenu) return null;

  const tabInfo = tabInfos.find(t => t.id === addMenu.id);
  if (!tabInfo) return null;

  const tenant = tenants.find(s => s.id === tabInfo.tenantId);

  return (
    <div
      ref={addMenuRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[200px]"
      style={{ top: addMenu.y, left: addMenu.x }}
    >
      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
        Add {addMenu.type === 'tenant' ? 'Module' : 'View'}
      </div>
      {addMenu.type === 'tenant' ? (
        <>
          {tenant?.moduleStubs.map((m: any) => (
            <button
              key={m.name}
              onClick={() => {
                openTab({
                  tabType: 'module',
                  title: m.label,
                  parentId: tabInfo.id,
                  tenantId: tabInfo.tenantId,
                  moduleName: m.name
                });
                setAddMenu(null);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <Box className="w-4 h-4 opacity-50" />
              {m.label}
            </button>
          ))}
        </>
      ) : (
        <>
          {!$module ? (
            <div className="px-4 py-2 text-xs text-gray-400 italic">Loading views...</div>
          ) : (
            $module.views.map((v: any) => (
              <button
                key={v.name}
                onClick={() => {
                  openTab({
                    tabType: 'view',
                    title: v.label,
                    parentId: tabInfo.id,
                    tenantId: tabInfo.tenantId,
                    moduleName: tabInfo.moduleName,
                    viewName: v.name
                  });
                  setAddMenu(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <Layout className="w-4 h-4 opacity-50" />
                {v.label}
              </button>
            ))
          )}
        </>
      )}
    </div>
  );
}
