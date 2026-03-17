'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { TabInfo } from './WorkspaceContext';
import { ViewType } from '@/infrastructure/View';
import { View } from '@/infrastructure/client/View';
import { useModule } from './ModuleContext';
import { ModelRecord, PropertyValue } from '@/types';

export interface BaseViewContextType {
  viewType: ViewType;
  view: View;
  tabInfo: TabInfo;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  refresh: () => Promise<void>;
}

export interface ListViewContextType extends BaseViewContextType {
  viewType: 'LIST';
  records: ModelRecord[];
  setRecords: (records: ModelRecord[]) => void;
}

export interface DetailViewContextType extends BaseViewContextType {
  viewType: 'DETAIL';
  record: ModelRecord;
  setRecord: (record: ModelRecord) => void;
  handleRecordChange: (propertyName: string, value: PropertyValue) => void;
  save: () => Promise<void>;
}

export type ViewContextType = ListViewContextType | DetailViewContextType;

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ tabInfo, children }: { tabInfo: TabInfo, children: React.ReactNode }) {
  const { module } = useModule();

  const view = useMemo(() => {
    return module.getView(tabInfo.viewName!);
  }, [module, tabInfo.viewName]);

  let context: ViewContextType;

  const [isLoading, setIsLoading] = useState(true);

  if (view.viewType === 'LIST') {
    const [records, setRecords] = useState<ModelRecord[]>([]);

    context = useMemo<ListViewContextType>(() => ({
      viewType: 'LIST',
      view: view!,
      tabInfo,
      isLoading,
      setIsLoading,
      records,
      setRecords,
      refresh: () => Promise.resolve(),
    }), [tabInfo, view, isLoading, records]);
  } else {
    const [record, setRecord] = useState<ModelRecord>({});

    context = useMemo<DetailViewContextType>(() => ({
      viewType: 'DETAIL',
      view: view!,
      tabInfo,
      isLoading,
      setIsLoading,
      record,
      setRecord,
      refresh: () => Promise.resolve(),
      handleRecordChange: () => { },
      save: () => Promise.resolve(),
    }), [tabInfo, view, isLoading, record]);
  }

  return (
    <ViewContext.Provider value={context}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView<T extends ViewContextType>() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context as T;
}

