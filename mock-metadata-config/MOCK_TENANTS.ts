import { TenantStored } from '@/infrastructure/stored/TenantStored';
import { salesModule } from './sales';
import { inventoryModule } from './inventory';
import { metaManagerModule } from './meta-manager';

export const MOCK_TENANTS: TenantStored[] = [
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
