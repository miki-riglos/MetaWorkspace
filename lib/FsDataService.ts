import { IDataService, ModelRecord } from '@/infrastructure/types';
import fs from 'fs';
import path from 'path';

export class FsDataService implements IDataService {
  private _dbDir: string;
  private _cache: Map<string, ModelRecord[]> = new Map();

  constructor(dbDir: string) {
    this._dbDir = dbDir;
  }

  private getCacheKey(tenantId: string, moduleName: string, modelName: string) {
    return `${tenantId}:${moduleName}:${modelName}`;
  }

  private getFilePath(tenantId: string, moduleName: string, modelName: string) {
    return path.join(this._dbDir, tenantId, moduleName, `${modelName}.json`);
  }

  private loadDataIfNeeded(tenantId: string, moduleName: string, modelName: string) {
    const key = this.getCacheKey(tenantId, moduleName, modelName);
    if (!this._cache.has(key)) {
      const filePath = this.getFilePath(tenantId, moduleName, modelName);
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          this._cache.set(key, JSON.parse(fileContent) as ModelRecord[]);
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error);
          this._cache.set(key, []);
        }
      } else {
        this._cache.set(key, []);
      }
    }
  }

  public getRecords(tenantId: string, moduleName: string, modelName: string): ModelRecord[] {
    this.loadDataIfNeeded(tenantId, moduleName, modelName);
    const key = this.getCacheKey(tenantId, moduleName, modelName);
    return this._cache.get(key) || [];
  }

  public getRecord(tenantId: string, moduleName: string, modelName: string, id: string): ModelRecord | undefined {
    const records = this.getRecords(tenantId, moduleName, modelName);
    return records.find((r) => r.id === id);
  }

  public insertRecord(tenantId: string, moduleName: string, modelName: string, data: ModelRecord): ModelRecord {
    const records = this.getRecords(tenantId, moduleName, modelName);
    const newRecord = { ...data, id: Math.random().toString(36).substring(7) };
    records.push(newRecord);
    return newRecord;
  }

  public updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: ModelRecord): ModelRecord | null {
    const records = this.getRecords(tenantId, moduleName, modelName);
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...data };
      return records[index];
    }
    return null;
  }

  public deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string): ModelRecord | null {
    const records = this.getRecords(tenantId, moduleName, modelName);
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      const deleted = records.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}
