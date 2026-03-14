import { TenantConfig } from '@/metadata/Tenant';
import { salesModule } from './sales';
import { inventoryModule } from './inventory';
import { metaManagerModule } from './meta-manager';

export const MOCK_TENANTS: TenantConfig[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corp',
    modules: [salesModule],
  },
  {
    id: 'tenant-2',
    name: 'Globex',
    modules: [inventoryModule],
  },
  {
    id: 'tenant-admin',
    name: 'Meta Administrator',
    modules: [metaManagerModule],
  },
];
