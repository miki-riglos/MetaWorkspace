'use client';

import React from 'react';
import { Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TenantTab } from './TenantTab';
import { ModuleTab } from './ModuleTab';
import { ViewTab } from './ViewTab';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WorkspaceAreaProps {
  tabInfos: TabInfo[];
  activeTabId: string | null;
  activeSubTabIds: Record<string, string | null>;
  setActiveTab: (id: string) => void;
  setActiveSubTab: (parentId: string, id: string | null) => void;
  closeTab: (id: string) => void;
  handleAddClick: (e: React.MouseEvent, id: string) => void;
  handleContextMenu: (e: React.MouseEvent, id: string) => void;
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
}

export function WorkspaceArea({
  tabInfos,
  activeTabId,
  activeSubTabIds,
  setActiveSubTab,
  closeTab,
  handleAddClick,
  handleContextMenu,
  openTab
}: WorkspaceAreaProps) {
  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <AnimatePresence>
        {tabInfos.length === 0 && (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center mb-6">
              <Layout className="w-8 h-8 text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to MetaWorkspace</h1>
            <p className="text-gray-500 max-w-md">
              Select a module or view from the sidebar to get started. You can open multiple tabs and switch between them seamlessly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {tabInfos.length > 0 && (
        <div className="absolute inset-0 flex flex-col">
          {tabInfos.filter(t => !t.parentId).map((tabInfo) => (
            <div
              key={tabInfo.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-200 flex flex-col",
                activeTabId === tabInfo.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              {tabInfo.tabType === 'tenant' ? (
                <TenantTab
                  tabInfo={tabInfo}
                  tabInfos={tabInfos}
                  activeSubTabIds={activeSubTabIds}
                  setActiveSubTab={setActiveSubTab}
                  closeTab={closeTab}
                  handleAddClick={handleAddClick}
                  handleContextMenu={handleContextMenu}
                  openTab={openTab}
                />
              ) : tabInfo.tabType === 'module' ? (
                <ModuleTab
                  tabInfo={tabInfo}
                  tabInfos={tabInfos}
                  activeSubTabIds={activeSubTabIds}
                  setActiveSubTab={setActiveSubTab}
                  closeTab={closeTab}
                  handleAddClick={handleAddClick}
                  handleContextMenu={handleContextMenu}
                  openTab={openTab}
                />
              ) : tabInfo.tabType === 'view' ? (
                <ViewTab tabInfo={tabInfo} />
              ) : (
                <div className="p-12">Placeholder for {tabInfo.title}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
