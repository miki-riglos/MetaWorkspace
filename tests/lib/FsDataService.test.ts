import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { FsDataService } from '../../lib/FsDataService';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('FsDataService', () => {
  let dbDir: string;
  let service: FsDataService;
  const tenantId = 'tenant1';
  const moduleName = 'module1';
  const modelName = 'model1';

  beforeEach(() => {
    // Create a temporary directory for testing
    dbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fs-data-service-test-'));
    service = new FsDataService(dbDir);
  });

  afterEach(() => {
    // Clean up the temporary directory
    fs.rmSync(dbDir, { recursive: true, force: true });
  });

  test('should load data from file if exists', () => {
    const filePath = path.join(dbDir, tenantId, moduleName, `${modelName}.json`);
    fs.mkdirSync(path.join(dbDir, tenantId, moduleName), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify([{ id: '123', title: 'File Record' }]));

    const records = service.getRecords(tenantId, moduleName, modelName);
    expect(records.length).toBe(1);
    expect(records[0].id).toBe('123');
    expect(records[0].title).toBe('File Record');
  });

  test('should insert and retrieve a record', () => {
    const data = { title: 'Test Record' };
    const inserted = service.insertRecord(tenantId, moduleName, modelName, data);

    expect(inserted.id).toBeDefined();
    expect(inserted.title).toBe('Test Record');

    const retrieved = service.getRecord(tenantId, moduleName, modelName, inserted.id!);
    expect(retrieved).toEqual(inserted);
  });

  test('should update a record', () => {
    const data = { title: 'Test Record' };
    const inserted = service.insertRecord(tenantId, moduleName, modelName, data);

    const updated = service.updateRecord(tenantId, moduleName, modelName, inserted.id!, { title: 'Updated Record' });
    expect(updated?.title).toBe('Updated Record');

    const retrieved = service.getRecord(tenantId, moduleName, modelName, inserted.id!);
    expect(retrieved?.title).toBe('Updated Record');
  });

  test('should delete a record', () => {
    const data = { title: 'Test Record' };
    const inserted = service.insertRecord(tenantId, moduleName, modelName, data);

    const deleted = service.deleteRecord(tenantId, moduleName, modelName, inserted.id!);
    expect(deleted?.id).toBe(inserted.id);

    const retrieved = service.getRecord(tenantId, moduleName, modelName, inserted.id!);
    expect(retrieved).toBeUndefined();
  });

  test('should return all records', () => {
    const data1 = { title: 'Record 1' };
    const data2 = { title: 'Record 2' };

    service.insertRecord(tenantId, moduleName, modelName, data1);
    service.insertRecord(tenantId, moduleName, modelName, data2);

    const records = service.getRecords(tenantId, moduleName, modelName);
    expect(records.length).toBe(2);
  });
});
