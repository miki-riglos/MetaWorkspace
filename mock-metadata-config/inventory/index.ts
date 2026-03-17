import { ModuleStored } from '@/infrastructure/stored/ModuleStored';
import { Product } from './models/Product';
import { ProductList } from './views/ProductList';

export const inventoryModule: ModuleStored = {
  name: 'inventory',
  label: 'Inventory Control',
  models: [Product],
  views: [ProductList],
};
