'use client';

import { Registry } from '@/lib/Registry';
import { ViewPartComponent } from '@/components/view-parts/types';
import { DefaultComponent } from '@/components/view-parts/DefaultComponent';
import { Label } from '@/components/view-parts/Label';
import { InputField } from '@/components/view-parts/InputField';
import { Button } from '@/components/view-parts/Button';
import { Card } from '@/components/view-parts/Card';
import { DataGrid } from '@/components/view-parts/DataGrid';
import { FormLayout } from '@/components/view-parts/FormLayout';
import { LookupField } from '@/components/view-parts/LookupField';
import { RelationGrid } from '@/components/view-parts/RelationGrid';

class ViewPartRegistry extends Registry<ViewPartComponent> {
  get(name: string): ViewPartComponent {
    return super.get(name) || DefaultComponent;
  }
}

export const viewPartRegistry = new ViewPartRegistry();

// Initialize with default components
viewPartRegistry.register('Label', Label);
viewPartRegistry.register('InputField', InputField);
viewPartRegistry.register('TextField', InputField);
viewPartRegistry.register('SelectField', InputField);
viewPartRegistry.register('Button', Button);
viewPartRegistry.register('Card', Card);
viewPartRegistry.register('DataGrid', DataGrid);
viewPartRegistry.register('FormLayout', FormLayout);
viewPartRegistry.register('LookupField', LookupField);
viewPartRegistry.register('RelationGrid', RelationGrid);
