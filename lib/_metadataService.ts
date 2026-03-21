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

    const moduleFilePath = path.join(this._dbDir, moduleName, 'index.json');
    if (!fs.existsSync(moduleFilePath)) {
      throw new Error(`Module ${moduleName} not found in ${moduleFilePath}`);
    }

    const moduleStored = JSON.parse(fs.readFileSync(moduleFilePath, 'utf-8'));
    this._cache.set(moduleName, moduleStored);

    return moduleStored;
  }
}

