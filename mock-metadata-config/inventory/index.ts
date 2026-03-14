import { ModuleRecord } from '@/metadata/Module';
import { Product } from './models/Product';
import { ProductList } from './views/ProductList';

export const inventoryModule: ModuleRecord = {
  name: 'inventory',
  label: 'Inventory Control',
  models: [Product],
  views: [ProductList],
};
