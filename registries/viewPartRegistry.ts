'use client';

import { Registry } from '@/lib/Registry';
import { ViewPartComponent } from '@/components/types';
import { Label } from '@/components/view-parts/Label';
import { InputField } from '@/components/view-parts/InputField';
import { Card } from '@/components/view-parts/Card';
import { DataGrid } from '@/components/view-parts/DataGrid';
import { DisplayField } from '@/components/view-parts/DisplayField';
import { FormLayout } from '@/components/view-parts/FormLayout';
import { LookupField } from '@/components/view-parts/LookupField';
import { RelationGrid } from '@/components/view-parts/RelationGrid';

export const viewPartRegistry = new Registry<ViewPartComponent>();

// Initialize with default components
viewPartRegistry.register('Label', Label);
viewPartRegistry.register('InputField', InputField);
viewPartRegistry.register('TextField', InputField);
viewPartRegistry.register('SelectField', InputField);
viewPartRegistry.register('Card', Card);
viewPartRegistry.register('DataGrid', DataGrid);
viewPartRegistry.register('DisplayField', DisplayField);
viewPartRegistry.register('FormLayout', FormLayout);
viewPartRegistry.register('LookupField', LookupField);
viewPartRegistry.register('RelationGrid', RelationGrid);
