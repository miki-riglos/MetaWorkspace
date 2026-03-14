import { Registry } from '@/lib/Registry';
import { Tenant } from '@/metadata/Tenant';
import { MOCK_TENANTS } from '@/mock-metadata-config';

/**
 * Global registry for tenants, initialized with mock data.
 */
export const tenantRegistry = new Registry<Tenant>();

// Initialize the registry with mock tenants
MOCK_TENANTS.forEach(config => {
  tenantRegistry.register(config.id, new Tenant(config));
});
