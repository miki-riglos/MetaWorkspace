import { TenantStub } from '@/metadata/Tenant';
import { Module } from '@/metadata/Module';
import { salesModule } from './sales';
import { inventoryModule } from './inventory';
import { metaManagerModule } from './meta-manager';

export const MOCK_TENANTS: TenantStub[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corp',
    moduleStubs: [new Module(salesModule).toStub()],
  },
  {
    id: 'tenant-2',
    name: 'Globex',
    moduleStubs: [new Module(inventoryModule).toStub()],
  },
  {
    id: 'tenant-admin',
    name: 'Meta Administrator',
    moduleStubs: [new Module(metaManagerModule).toStub()],
  },
];
