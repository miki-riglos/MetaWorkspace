'use client';

import React, { useMemo } from 'react';
import { ViewPartConfig } from '@/metadata/View';
import { ModelConfig } from '@/metadata/Model';
import { viewPartRegistry } from '@/registries/viewPartRegistry';

interface ViewPartRendererProps {
  part: ViewPartConfig;
  tenantId: string;
  moduleName: string;
  modelDef?: ModelConfig;
  data?: any[];
  record?: any;
  onRecordChange?: (propertyName: string, value: any) => void;
}

export function ViewPartRenderer({
  part,
  tenantId,
  moduleName,
  modelDef,
  data,
  record,
  onRecordChange
}: ViewPartRendererProps) {
  const Component = useMemo(() => viewPartRegistry.get(part.component), [part.component]);
  
  // Find property definition if propertyName is specified
  const propertyDef = modelDef?.properties?.find((p: any) => p.name === part.propertyName);
  
  // Enriched props for the component
  const enrichedProps = {
    ...part.props,
    tenantId,
    moduleName,
    targetModel: propertyDef?.relation?.targetModel,
    cardinality: propertyDef?.relation?.cardinality,
  };

  // Final props passed to the component
  const componentProps = {
    props: enrichedProps,
    data,
    value: part.propertyName && record ? record[part.propertyName] : undefined,
    onChange: part.propertyName && onRecordChange 
      ? (val: any) => onRecordChange(part.propertyName!, val) 
      : undefined,
  };

  // Render children recursively
  const children = part.children?.map(child => (
    <ViewPartRenderer
      key={child.id}
      part={child}
      tenantId={tenantId}
      moduleName={moduleName}
      modelDef={modelDef}
      data={data}
      record={record}
      onRecordChange={onRecordChange}
    />
  ));

  return React.createElement(
    Component,
    { ...componentProps, key: part.id },
    children
  );
}
