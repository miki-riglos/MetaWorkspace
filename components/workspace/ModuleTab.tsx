'use client';

import React from 'react';
import { TabStrip } from '../TabStrip';
import { ModuleOverview } from './ModuleOverview';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { ViewTab } from './ViewTab';

import { ModuleProvider } from '@/contexts/ModuleContext';

interface ModuleTabProps {
  tabInfo: TabInfo;
  tabInfos: TabInfo[];
  activeSubTabIds: Record<string, string | null>;
  setActiveSubTab: (parentId: string, id: string | null) => void;
  closeTab: (id: string) => void;
  handleAddClick: (e: React.MouseEvent, id: string) => void;
  handleContextMenu: (e: React.MouseEvent, id: string) => void;
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
}

export function ModuleTab({
  tabInfo,
  tabInfos,
  activeSubTabIds,
  setActiveSubTab,
  closeTab,
  handleAddClick,
  handleContextMenu,
  openTab
}: ModuleTabProps) {
  const childTabs = tabInfos.filter(t => t.parentId === tabInfo.id);
  const activeSubTabId = activeSubTabIds[tabInfo.id];

  return (
    <ModuleProvider tabInfo={tabInfo}>
      <div className="flex flex-col h-full">
        {childTabs.length > 0 && (
          <div className="h-10 border-b border-gray-200 bg-white shrink-0">
            <TabStrip
              tabInfos={childTabs}
              activeTabId={activeSubTabId || null}
              onTabClick={(id) => setActiveSubTab(tabInfo.id, id)}
              onTabClose={closeTab}
              onAddClick={handleAddClick}
              onContextMenu={handleContextMenu}
              variant="nested"
            />
          </div>
        )}

        <div className="flex-1 relative overflow-hidden">
          {activeSubTabId ? (
            childTabs.map(subTab => (
              <div
                key={subTab.id}
                className={`absolute inset-0 transition-opacity duration-200 flex flex-col ${
                  activeSubTabId === subTab.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {subTab.tabType === 'view' ? (
                  <ViewTab tabInfo={subTab} />
                ) : (
                  <div className="p-12">Placeholder for {subTab.title}</div>
                )}
              </div>
            ))
          ) : (
            <ModuleOverview tabInfo={tabInfo} openTab={openTab} />
          )}
        </div>
      </div>
    </ModuleProvider>
  );
}
