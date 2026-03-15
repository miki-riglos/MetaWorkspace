'use client';

import React from 'react';
import { TabInfo } from '@/contexts/WorkspaceContext';
import { X, Database, Box, Layout, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TabStripProps {
  tabInfos: TabInfo[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddClick?: (e: React.MouseEvent, id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  variant?: 'root' | 'nested';
}

export function TabStrip({
  tabInfos,
  activeTabId,
  onTabClick,
  onTabClose,
  onAddClick,
  onContextMenu,
  variant = 'root'
}: TabStripProps) {
  const getTabIcon = (tabType: string) => {
    switch (tabType) {
      case 'tenant': return <Database className={cn(variant === 'root' ? "w-3.5 h-3.5" : "w-3 h-3")} />;
      case 'module': return <Box className={cn(variant === 'root' ? "w-3.5 h-3.5" : "w-3 h-3")} />;
      case 'view': return <Layout className={cn(variant === 'root' ? "w-3.5 h-3.5" : "w-3 h-3")} />;
      default: return null;
    }
  };

  const getTabColor = (tabType: string, active: boolean) => {
    if (!active) return "text-gray-500 hover:bg-gray-50 border-transparent";
    switch (tabType) {
      case 'tenant': return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case 'module': return "bg-amber-50 border-amber-200 text-amber-700";
      case 'view': return "bg-emerald-50 border-emerald-200 text-emerald-700";
      default: return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getIndicatorColor = (tabType: string) => {
    switch (tabType) {
      case 'tenant': return "bg-indigo-600";
      case 'module': return "bg-amber-600";
      case 'view': return "bg-emerald-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-1 overflow-x-auto no-scrollbar h-full",
      variant === 'root' ? "pt-2" : "px-6"
    )}>
      {tabInfos.map((tabInfo) => (
        <div
          key={tabInfo.id}
          onClick={() => onTabClick(tabInfo.id)}
          onContextMenu={(e) => onContextMenu(e, tabInfo.id)}
          className={cn(
            "group relative flex items-center gap-2 cursor-pointer transition-all border-x border-t shrink-0",
            variant === 'root'
              ? "px-4 py-2 text-sm font-medium rounded-t-lg"
              : "px-3 py-1.5 text-xs font-semibold rounded-t-md",
            getTabColor(tabInfo.tabType, activeTabId === tabInfo.id)
          )}
        >
          <span className={cn(
            "p-1 rounded-md",
            activeTabId === tabInfo.id ? "bg-white/50" : "bg-gray-100"
          )}>
            {getTabIcon(tabInfo.tabType)}
          </span>
          <span className="truncate max-w-[150px]">{tabInfo.title}</span>

          {(tabInfo.tabType === 'tenant' || tabInfo.tabType === 'module') && onAddClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddClick(e, tabInfo.id);
              }}
              className="p-0.5 rounded-md hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Plus className={cn(variant === 'root' ? "w-3 h-3" : "w-2.5 h-2.5")} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tabInfo.id);
            }}
            className="p-0.5 rounded-md hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className={cn(variant === 'root' ? "w-3 h-3" : "w-2.5 h-2.5")} />
          </button>

          {activeTabId === tabInfo.id && variant === 'root' && (
            <motion.div
              layoutId="activeTabIndicator"
              className={cn("absolute bottom-[-1px] left-0 right-0 h-[2px]", getIndicatorColor(tabInfo.tabType))}
            />
          )}

          {activeTabId === tabInfo.id && variant === 'nested' && (
            <div className={cn("absolute bottom-[-1px] left-0 right-0 h-[2px]", getIndicatorColor(tabInfo.tabType))} />
          )}
        </div>
      ))}
    </div>
  );
}
