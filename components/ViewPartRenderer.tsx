'use client';

import React, { useMemo } from 'react';
import { View, ViewPartConfig } from '@/client-metadata/View';
import { viewPartRegistry } from '@/registries/viewPartRegistry';

interface ViewPartRendererProps {
  view: View;
  part: ViewPartConfig;
  data?: any[];
  record?: any;
  onRecordChange?: (propertyName: string, value: any) => void;
}

export function ViewPartRenderer({
  view,
  part: partConfig,
  data,
  record,
  onRecordChange
}: ViewPartRendererProps) {
  const Component = useMemo(() => viewPartRegistry.get(partConfig.componentName), [partConfig.componentName]);

  // Find property definition if propertyName is specified
  const property = view.model.properties.find((p: any) => p.name === partConfig.propertyName);

  // Enriched props for the component
  const enrichedProps = {
    ...partConfig.props,
    targetModel: property?.relation?.targetModel,
    cardinality: property?.relation?.cardinality,
  };

  // Final props passed to the component
  const componentProps = {
    props: enrichedProps,
    data,
    value: partConfig.propertyName && record ? record[partConfig.propertyName] : undefined,
    onChange: partConfig.propertyName && onRecordChange
      ? (val: any) => onRecordChange(partConfig.propertyName!, val)
      : undefined,
  };

  // Render children recursively
  const children = partConfig.children?.map(child => (
    <ViewPartRenderer
      key={child.id}
      view={view}
      part={child}
      data={data}
      record={record}
      onRecordChange={onRecordChange}
    />
  ));

  return React.createElement(
    Component,
    { ...componentProps, key: partConfig.id },
    children
  );
}
