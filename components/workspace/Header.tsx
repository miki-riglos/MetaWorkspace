'use client';

import React from 'react';
import { Menu, User } from 'lucide-react';
import { TabStrip } from '../TabStrip';
import { TabInfo } from '@/contexts/WorkspaceContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  tabInfos: TabInfo[];
  activeTabId: string | null;
  setActiveTab: (id: string) => void;
  closeTab: (id: string) => void;
  handleAddClick: (e: React.MouseEvent, id: string) => void;
  handleContextMenu: (e: React.MouseEvent, id: string) => void;
  user: any;
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  tabInfos,
  activeTabId,
  setActiveTab,
  closeTab,
  handleAddClick,
  handleContextMenu,
  user
}: HeaderProps) {
  return (
    <header className="h-14 border-b border-gray-200 flex items-center px-4 gap-4 bg-white z-10">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-500" />
      </button>

      <div className="flex-1 h-full">
        <TabStrip
          tabInfos={tabInfos.filter(t => !t.parentId)}
          activeTabId={activeTabId}
          onTabClick={setActiveTab}
          onTabClose={closeTab}
          onAddClick={handleAddClick}
          onContextMenu={handleContextMenu}
          variant="root"
        />
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-gray-900">{user?.name}</div>
          <div className="text-[10px] text-gray-400">{user?.email}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
          <User className="w-4 h-4 text-indigo-600" />
        </div>
      </div>
    </header>
  );
}
