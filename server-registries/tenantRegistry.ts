import { Registry } from '@/lib/Registry';
import { Tenant } from '@/metadata/Tenant';
import { MOCK_TENANTS } from '@/mock-metadata-config';

export const tenantRegistry = new Registry<Tenant>();

MOCK_TENANTS.forEach(config => {
  tenantRegistry.register(config.id, new Tenant(config));
});
