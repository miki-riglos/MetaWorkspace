'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Sidebar } from './workspace/Sidebar';
import { Header } from './workspace/Header';
import { WorkspaceArea } from './workspace/WorkspaceArea';
import { TabContextMenu } from './workspace/TabContextMenu';
import { AddMenu } from './workspace/AddMenu';
import { useAuth } from '@/contexts/AuthContext';

export function Workspace() {
  const { user, logout } = useAuth();
  const { 
    tabInfos, 
    activeTabId, 
    activeSubTabIds,
    tenantStubs,
    openTab, 
    closeTab, 
    setActiveTab,
    setActiveSubTab,
    closeOthers,
    closeToTheRight,
    duplicateTab,
    closeAll,
  } = useWorkspace();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ id: string, x: number, y: number } | null>(null);
  const [addMenu, setAddMenu] = useState<{ id: string, x: number, y: number, type: 'tenant' | 'module' } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({ id, x: e.clientX, y: e.clientY });
  };

  const handleAddClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const tabInfo = tabInfos.find(t => t.id === id);
    if (tabInfo && (tabInfo.tabType === 'tenant' || tabInfo.tabType === 'module')) {
      setAddMenu({ id, x: e.clientX, y: e.clientY, type: tabInfo.tabType as 'tenant' | 'module' });
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        tenantStubs={tenantStubs} 
        openTab={openTab} 
        logout={logout} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          tabInfos={tabInfos}
          activeTabId={activeTabId}
          setActiveTab={setActiveTab}
          closeTab={closeTab}
          handleAddClick={handleAddClick}
          handleContextMenu={handleContextMenu}
          user={user}
        />

        <WorkspaceArea 
          tabInfos={tabInfos}
          activeTabId={activeTabId}
          activeSubTabIds={activeSubTabIds}
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
          closeTab={closeTab}
          handleAddClick={handleAddClick}
          handleContextMenu={handleContextMenu}
          openTab={openTab}
        />
      </main>

      <TabContextMenu 
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        duplicateTab={duplicateTab}
        closeOthers={closeOthers}
        closeToTheRight={closeToTheRight}
        closeAll={closeAll}
      />

      <AddMenu 
        addMenu={addMenu}
        setAddMenu={setAddMenu}
        tabInfos={tabInfos}
        openTab={openTab}
      />
    </div>
  );
}
