import fs from 'fs';
import path from 'path';
import { ModuleStored } from '@/infrastructure/stored/metadata/ModuleStored';

export class MetadataService {
  private _dbDir: string;
  private _cache: Map<string, ModuleStored> = new Map();

  constructor(dbDir: string) {
    this._dbDir = dbDir;
  }

  getModuleStored(moduleName: string): ModuleStored {
    if (this._cache.has(moduleName)) {
      return this._cache.get(moduleName)!;
    }

    const dbMetaDir = path.join(this._dbDir, 'metadata');
    const moduleFilePath = path.join(dbMetaDir, moduleName, 'index.json');
    if (!fs.existsSync(moduleFilePath)) {
      throw new Error(`Module ${moduleName} not found`);
    }

    const moduleStored = JSON.parse(fs.readFileSync(moduleFilePath, 'utf-8'));
    this._cache.set(moduleName, moduleStored);

    return moduleStored;
  }
}

// HMR: do not discard in-memory state on reload
const globalAny: any = global;
export const metadataService: MetadataService = globalAny.__metadataService || new MetadataService(path.join(process.cwd(), './db/metadata'));
if (process.env.NODE_ENV !== 'production') {
  globalAny.__metadataService = metadataService;
}
