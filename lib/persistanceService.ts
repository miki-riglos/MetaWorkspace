import { ModelRecord } from '@/types';
import fs from 'fs';
import path from 'path';

export class PersistanceService {
  private dbDir: string;

  constructor() {
    // Ensure db directory exists
    this.dbDir = path.join(process.cwd(), '../MetaWorkspaceStore/db');
    if (!fs.existsSync(this.dbDir)) {
      fs.mkdirSync(this.dbDir, { recursive: true });
    }
  }

  private getFilePath(tenantId: string, moduleName: string, modelName: string) {
    return path.join(this.dbDir, tenantId, moduleName, `${modelName}.json`);
  }

  private readData(tenantId: string, moduleName: string, modelName: string): ModelRecord[] {
    const filePath = this.getFilePath(tenantId, moduleName, modelName);

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
      }
    }

    // If no file exists, initialize it with an empty array
    this.writeData(tenantId, moduleName, modelName, []);

    return [];
  }

  private writeData(tenantId: string, moduleName: string, modelName: string, data: ModelRecord[]) {
    const filePath = this.getFilePath(tenantId, moduleName, modelName);
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
    }
  }

  public getRecords(tenantId: string, moduleName: string, modelName: string) {
    return this.readData(tenantId, moduleName, modelName);
  }

  public getRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
    const records = this.getRecords(tenantId, moduleName, modelName);
    return records.find((r) => r.id === id);
  }

  public insertRecord(tenantId: string, moduleName: string, modelName: string, data: ModelRecord) {
    const records = this.readData(tenantId, moduleName, modelName);
    const newRecord = { ...data, id: Math.random().toString(36).substring(7) };
    records.push(newRecord);
    this.writeData(tenantId, moduleName, modelName, records);
    return newRecord;
  }

  public updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: ModelRecord) {
    const records = this.readData(tenantId, moduleName, modelName);
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...data };
      this.writeData(tenantId, moduleName, modelName, records);
      return records[index];
    }
    return null;
  }

  public deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
    const records = this.readData(tenantId, moduleName, modelName);
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      const deleted = records.splice(index, 1);
      this.writeData(tenantId, moduleName, modelName, records);
      return deleted[0];
    }
    return null;
  }
}

export const persistanceService = new PersistanceService();
