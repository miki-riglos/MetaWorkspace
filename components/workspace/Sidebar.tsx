'use client';

import React from 'react';
import { Layout, Database, Box, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TabInfo } from '@/contexts/WorkspaceContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  sidebarOpen: boolean;
  tenants: any[];
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
  logout: () => void;
}

export function Sidebar({ sidebarOpen, tenants, openTab, logout }: SidebarProps) {
  return (
    <aside className={cn(
      "bg-gray-900 text-white transition-all duration-300 flex flex-col",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
          <Layout className="w-5 h-5" />
        </div>
        {sidebarOpen && <span className="font-bold tracking-tight">MetaWorkspace</span>}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="space-y-2">
            {sidebarOpen && (
              <button
                onMouseDown={() => openTab({
                  tabType: 'tenant',
                  title: tenant.name,
                  tenantId: tenant.id
                })}
                className="w-full text-left px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 hover:text-white transition-colors flex items-center gap-2"
              >
                <Database className="w-3 h-3" />
                {tenant.name}
              </button>
            )}
            {tenant.moduleStubs.map(($module: any) => (
              <div key={$module.name} className="space-y-1">
                <button
                  onMouseDown={() => openTab({
                    tabType: 'module',
                    title: $module.label,
                    tenantId: tenant.id,
                    moduleName: $module.name
                  })}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5",
                    !sidebarOpen && "justify-center"
                  )}
                >
                  <Box className="w-4 h-4 text-indigo-400" />
                  {sidebarOpen && <span className="flex-1 text-left truncate">{$module.label}</span>}
                </button>
                {sidebarOpen && (
                  <div className="ml-7 space-y-1 border-l border-white/10 pl-4">
                    {$module.views.map((view: any) => (
                      <button
                        key={view.name}
                        onMouseDown={() => openTab({
                          tabType: 'view',
                          title: view.label,
                          tenantId: tenant.id,
                          moduleName: $module.name,
                          viewName: view.name
                        })}
                        className="w-full text-left text-xs py-1.5 text-white/60 hover:text-white transition-colors"
                      >
                        {view.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors",
            !sidebarOpen && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
