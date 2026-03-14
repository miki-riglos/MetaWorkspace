'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { TenantStub } from '@/metadata/Tenant';
import { useAuth } from '@/contexts/AuthContext';

export type TabType = 'tenant' | 'module' | 'view';

export interface TabInfo {
  id: string;
  tabType: TabType;
  title: string;
  parentId?: string;
  tenantId: string;
  moduleName?: string;
  viewName?: string;
}

export interface WorkspaceState {
  tabInfos: TabInfo[];
  activeTabId: string | null;
  activeSubTabIds: Record<string, string | null>;
}

export interface WorkspaceContextType extends WorkspaceState {
  tenantStubs: TenantStub[];
  openTab: (tabInfo: Omit<TabInfo, 'id'>) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  setActiveSubTab: (parentId: string, childId: string | null) => void;
  closeOthers: (id: string) => void;
  closeToTheRight: (id: string) => void;
  duplicateTab: (id: string) => void;
  closeAll: () => void;
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

let runningId = 0;

function findTab(
  tabInfos: TabInfo[],
  activeSubTabIds: Record<string, string | null>,
  activeTabId: string | null,
  tabType: TabType,
  tenantId: string,
  moduleName?: string,
  viewName?: string,
  parentId?: string
): TabInfo | null {
  // If parentId is provided, we are looking for a child tab
  if (parentId) {
    // If we are looking for a module (likely as a parent for a view click)
    if (tabType === 'module') {
      const activeSubId = activeSubTabIds[parentId];
      const activeSubTab = tabInfos.find(t => t.id === activeSubId);
      // Reuse ONLY if it's the active one and matches the name
      if (activeSubTab && activeSubTab.tabType === 'module' && activeSubTab.moduleName === moduleName) {
        return activeSubTab;
      }
      return null; // Trigger new module creation
    }

    // Default behavior for Overview clicks or other children (mostly Views)
    return tabInfos.find(t => 
      t.parentId === parentId &&
      t.tabType === tabType &&
      (tabType === 'view' ? t.viewName === viewName : true)
    ) || null;
  }

  // Sidebar logic for Root level (Tenant)
  if (tabType === 'tenant') {
    const activeTab = tabInfos.find(t => t.id === activeTabId);
    if (activeTab && activeTab.tabType === 'tenant' && activeTab.tenantId === tenantId) {
      return activeTab; // Reuse active tenant if ID matches
    }
  }

  return null; // Trigger new tenant creation
}

function ensureTab(
  currentTabInfos: TabInfo[],
  activeSubTabIds: Record<string, string | null>,
  activeTabId: string | null,
  targetTabType: TabType,
  tabType: TabType,
  title: string,
  tenantId: string,
  moduleName?: string,
  viewName?: string,
  parentId?: string
): string {
  const isTarget = targetTabType === tabType;
  if (!isTarget) {
    let existing = findTab(currentTabInfos, activeSubTabIds, activeTabId, tabType, tenantId, moduleName, viewName, parentId);
    if (existing) return existing.id;
  }

  const id = `tab-${++runningId}`;
  const newTab: TabInfo = {
    id,
    tabType,
    title,
    parentId,
    tenantId: tenantId,
    moduleName: moduleName,
    viewName: viewName,
  };

  currentTabInfos.push(newTab);
  return id;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const tenantStubs = useMemo(() => user?.tenantStubs || [], [user]);
  const [state, setState] = useState<WorkspaceState>({
    tabInfos: [],
    activeTabId: null,
    activeSubTabIds: {}
  });

  const openTab = useCallback((tabData: Omit<TabInfo, 'id'>) => {
    const tenantId = tabData.tenantId;
    const moduleName = tabData.moduleName;
    const viewName = tabData.viewName;

    setState((prev) => {
      const { tabInfos, activeSubTabIds, activeTabId } = prev;
      let currentTabInfos = [...tabInfos];

      const tenantStub = tenantStubs.find(t => t.id === tenantId);
      const moduleStub = tenantStub?.moduleStubs.find(m => m.name === moduleName);

      const tenantTabId = ensureTab(
        currentTabInfos,
        activeSubTabIds,
        activeTabId,
        tabData.tabType,
        'tenant', 
        tenantStub?.name || `Tenant ${tenantId}`, 
        tenantId
      );

      let subTabToActivate: { parentId: string, childId: string }[] = [];

      if (tabData.tabType === 'module' || tabData.tabType === 'view') {
        const moduleTabId = ensureTab(
          currentTabInfos,
          activeSubTabIds,
          activeTabId,
          tabData.tabType,
          'module',
          moduleStub?.label || moduleName || 'Module',
          tenantId,
          moduleName,
          undefined,
          tenantTabId
        );
        subTabToActivate.push({ parentId: tenantTabId, childId: moduleTabId });

        if (tabData.tabType === 'view') {
          const viewTabId = ensureTab(
            currentTabInfos,
            activeSubTabIds,
            activeTabId,
            tabData.tabType,
            'view',
            tabData.title,
            tenantId,
            moduleName,
            viewName,
            moduleTabId
          );
          subTabToActivate.push({ parentId: moduleTabId, childId: viewTabId });
        }
      }

      const nextSubTabIds = { ...activeSubTabIds };
      if (tabData.tabType === 'tenant') {
        nextSubTabIds[tenantTabId] = nextSubTabIds[tenantTabId] || null;
      } else if (tabData.tabType === 'module') {
        nextSubTabIds[tenantTabId] = subTabToActivate.find(s => s.parentId === tenantTabId)?.childId || null;
        const moduleTabId = nextSubTabIds[tenantTabId];
        if (moduleTabId) nextSubTabIds[moduleTabId] = nextSubTabIds[moduleTabId] || null;
      } else if (tabData.tabType === 'view') {
        subTabToActivate.forEach(({ parentId, childId }) => {
          nextSubTabIds[parentId] = childId;
        });
      }

      return {
        tabInfos: currentTabInfos,
        activeTabId: tenantTabId,
        activeSubTabIds: nextSubTabIds
      };
    });
  }, [tenantStubs]);

  const closeTab = useCallback((id: string) => {
    setState((prev) => {
      const { tabInfos, activeTabId, activeSubTabIds } = prev;
      const getIdsToRemove = (parentId: string): string[] => {
        const children = tabInfos.filter(t => t.parentId === parentId);
        let ids = children.map(c => c.id);
        children.forEach(c => {
          ids = [...ids, ...getIdsToRemove(c.id)];
        });
        return ids;
      };

      const idsToRemove = [id, ...getIdsToRemove(id)];
      const tabToClose = tabInfos.find(t => t.id === id);
      const newTabInfos = tabInfos.filter((t) => !idsToRemove.includes(t.id));
      
      let nextActiveTabId = activeTabId;
      if (activeTabId === id || idsToRemove.includes(activeTabId || '')) {
        const rootTabs = newTabInfos.filter(t => !t.parentId);
        nextActiveTabId = rootTabs.length > 0 ? rootTabs[rootTabs.length - 1].id : null;
      }
      
      const nextSubTabIds = { ...activeSubTabIds };
      if (tabToClose?.parentId && nextSubTabIds[tabToClose.parentId] === id) {
        const siblingTabs = newTabInfos.filter(t => t.parentId === tabToClose.parentId);
        nextSubTabIds[tabToClose.parentId!] = siblingTabs.length > 0 ? siblingTabs[siblingTabs.length - 1].id : null;
      }

      // Clean up orphaned sub-tab IDs
      idsToRemove.forEach(rid => delete nextSubTabIds[rid]);

      return {
        tabInfos: newTabInfos,
        activeTabId: nextActiveTabId,
        activeSubTabIds: nextSubTabIds
      };
    });
  }, []);

  const setActiveTab = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeTabId: id }));
  }, []);

  const setActiveSubTab = useCallback((parentId: string, childId: string | null) => {
    setState(prev => ({
      ...prev,
      activeSubTabIds: { ...prev.activeSubTabIds, [parentId]: childId }
    }));
  }, []);

  const closeOthers = useCallback((id: string) => {
    setState((prev) => {
      const { tabInfos } = prev;
      const tabInfo = tabInfos.find(t => t.id === id);
      if (!tabInfo) return prev;
      
      const getIdsToKeep = (parentId: string): string[] => {
        const children = tabInfos.filter(t => t.parentId === parentId);
        let ids = children.map(c => c.id);
        children.forEach(c => {
          ids = [...ids, ...getIdsToKeep(c.id)];
        });
        return ids;
      };

      const idsToKeep = [id, ...getIdsToKeep(id)];
      const newTabInfos = tabInfos.filter(t => idsToKeep.includes(t.id));

      return {
        ...prev,
        tabInfos: newTabInfos,
        activeTabId: id
      };
    });
  }, []);

  const closeToTheRight = useCallback((id: string) => {
    setState((prev) => {
      const { tabInfos, activeTabId } = prev;
      const index = tabInfos.findIndex((t) => t.id === id);
      if (index === -1) return prev;
      
      const newTabInfos = tabInfos.slice(0, index + 1);
      let nextActiveTabId = activeTabId;
      if (tabInfos.findIndex(t => t.id === activeTabId) > index) {
        nextActiveTabId = id;
      }

      return {
        ...prev,
        tabInfos: newTabInfos,
        activeTabId: nextActiveTabId
      };
    });
  }, []);

  const duplicateTab = useCallback((id: string) => {
    setState((prev) => {
      const { tabInfos, activeSubTabIds } = prev;
      const tabInfosToDuplicate: TabInfo[] = [];
      const idMap: Record<string, string> = {};

      const collect = (targetId: string, newParentId?: string) => {
        const tabInfo = tabInfos.find(t => t.id === targetId);
        if (!tabInfo) return;

        const newId = `tab-${++runningId}`;
        idMap[targetId] = newId;
        
        const duplicatedTab: TabInfo = {
          ...tabInfo,
          id: newId,
          parentId: newParentId
        };
        tabInfosToDuplicate.push(duplicatedTab);

        tabInfos.filter(t => t.parentId === targetId).forEach(child => {
          collect(child.id, newId);
        });
      };

      const originalTab = tabInfos.find(t => t.id === id);
      if (!originalTab) return prev;

      collect(id, originalTab.parentId);
      if (tabInfosToDuplicate.length === 0) return prev;

      const newTabInfos = [...tabInfos];
      const originalIndex = tabInfos.findIndex(t => t.id === id);
      newTabInfos.splice(originalIndex + 1, 0, ...tabInfosToDuplicate);

      const nextSubTabIds = { ...activeSubTabIds };
      Object.entries(idMap).forEach(([oldId, newId]) => {
        if (activeSubTabIds[oldId]) {
          nextSubTabIds[newId] = idMap[activeSubTabIds[oldId]] || null;
        }
      });

      // If we duplicated a sub-tab, update the parent's active sub-tab pointer
      if (originalTab.parentId) {
        nextSubTabIds[originalTab.parentId] = idMap[id];
      }

      return {
        tabInfos: newTabInfos,
        activeTabId: originalTab.parentId ? prev.activeTabId : idMap[id],
        activeSubTabIds: nextSubTabIds
      };
    });
  }, []);

  const closeAll = useCallback(() => {
    setState({
      tabInfos: [],
      activeTabId: null,
      activeSubTabIds: {}
    });
  }, []);

  return (
    <WorkspaceContext.Provider value={{ 
      ...state,
      tenantStubs,
      openTab, 
      closeTab, 
      setActiveTab,
      setActiveSubTab,
      closeOthers,
      closeToTheRight,
      duplicateTab,
      closeAll
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
