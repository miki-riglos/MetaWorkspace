import fs from 'fs';
import path from 'path';
import { Tenant } from '@/infrastructure/Tenant';
import { TenantStored } from '@/infrastructure/stored/TenantStored';
import { ModuleStored } from '@/infrastructure/stored/ModuleStored';

class MetadataService {
  private _cache: Map<string, Tenant | null> = new Map();

  getTenant(tenantId: string): Tenant | null {
    if (this._cache.has(tenantId)) {
      return this._cache.get(tenantId) || null;
    }

    const dbMetaDir = path.join(process.cwd(), './db/metadata');
    const tenantFilePath = path.join(dbMetaDir, 'tenants', `${tenantId}.json`);

    if (!fs.existsSync(tenantFilePath)) {
      this._cache.set(tenantId, null);
      return null;
    }

    const tenantFileData = JSON.parse(fs.readFileSync(tenantFilePath, 'utf-8'));
    const moduleNames: string[] = tenantFileData.modules || [];

    const modules: ModuleStored[] = [];

    for (const moduleName of moduleNames) {
      const moduleDir = path.join(dbMetaDir, moduleName);
      if (!fs.existsSync(moduleDir)) continue;

      const indexContent = fs.readFileSync(path.join(moduleDir, 'index.json'), 'utf-8');
      const moduleData = JSON.parse(indexContent);

      const modelsDir = path.join(moduleDir, 'models');
      const viewsDir = path.join(moduleDir, 'views');

      const models = [];
      if (fs.existsSync(modelsDir)) {
        const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.json'));
        for (const file of modelFiles) {
          models.push(JSON.parse(fs.readFileSync(path.join(modelsDir, file), 'utf-8')));
        }
      }

      const views = [];
      if (fs.existsSync(viewsDir)) {
        const viewFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.json'));
        for (const file of viewFiles) {
          views.push(JSON.parse(fs.readFileSync(path.join(viewsDir, file), 'utf-8')));
        }
      }

      modules.push({
        name: moduleData.name,
        label: moduleData.label,
        models,
        views
      });
    }

    const tenantStored: TenantStored = {
      id: tenantFileData.id,
      name: tenantFileData.name,
      modules
    };

    const tenant = new Tenant(tenantStored);
    this._cache.set(tenantId, tenant);
    return tenant;
  }
}

// HMR: do not discard in-memory state on reload
const globalAny: any = global;
export const metadataService = globalAny.__metadataService || new MetadataService();
if (process.env.NODE_ENV !== 'production') {
  globalAny.__metadataService = metadataService;
}
