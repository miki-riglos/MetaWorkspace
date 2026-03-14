'use client';

import React, { useRef, useEffect } from 'react';
import { Copy, MoreVertical, ArrowRight, Trash2 } from 'lucide-react';

interface TabContextMenuProps {
  contextMenu: { id: string, x: number, y: number } | null;
  setContextMenu: (menu: { id: string, x: number, y: number } | null) => void;
  duplicateTab: (id: string) => void;
  closeOthers: (id: string) => void;
  closeToTheRight: (id: string) => void;
  closeAll: () => void;
}

export function TabContextMenu({
  contextMenu,
  setContextMenu,
  duplicateTab,
  closeOthers,
  closeToTheRight,
  closeAll
}: TabContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setContextMenu]);

  if (!contextMenu) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[180px]"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <button
        onClick={() => { duplicateTab(contextMenu.id); setContextMenu(null); }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Copy className="w-4 h-4 text-gray-400" />
        Duplicate Tab
      </button>
      <div className="h-[1px] bg-gray-100 my-1" />
      <button
        onClick={() => { closeOthers(contextMenu.id); setContextMenu(null); }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-400" />
        Close Others
      </button>
      <button
        onClick={() => { closeToTheRight(contextMenu.id); setContextMenu(null); }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <ArrowRight className="w-4 h-4 text-gray-400" />
        Close to the Right
      </button>
      <div className="h-[1px] bg-gray-100 my-1" />
      <button
        onClick={() => { closeAll(); setContextMenu(null); }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4 text-red-400" />
        Close All Tabs
      </button>
    </div>
  );
}
