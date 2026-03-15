import { Registry } from '@/lib/Registry';
import { ListView } from '@/components/ListView';
import { DetailView } from '@/components/DetailView';
import { ViewComponent } from '@/components/types';

export const viewRegistry = new Registry<ViewComponent>();

// Register standard views
viewRegistry.register('LIST', ListView);
viewRegistry.register('DETAIL', DetailView);
