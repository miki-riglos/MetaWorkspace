import { Module, ModuleConfig } from '@/client-metadata/Module';
import { Tenant, TenantConfig } from '@/client-metadata/Tenant';

export class ConfigService {
  /**
   * Fetches the configuration for a specific tenant.
   */
  static async getTenant(tenantId: string): Promise<Tenant> {
    const response = await fetch(`/cfg/${tenantId}`);
    if (!response.ok) {
      let errorMessage = 'Failed to fetch tenant config';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        errorMessage = `Server returned ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const config: TenantConfig = await response.json();
    return new Tenant(config);
  }

  /**
   * Fetches the configuration for a specific module.
   */
  static async getModule(tenantId: string, moduleName: string): Promise<Module> {
    const response = await fetch(`/cfg/${tenantId}/${moduleName}`);
    if (!response.ok) {
      let errorMessage = 'Failed to fetch module config';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        errorMessage = `Server returned ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const config: ModuleConfig = await response.json();
    return new Module(config);
  }
}
