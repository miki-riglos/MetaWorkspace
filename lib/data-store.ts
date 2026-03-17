import { INITIAL_DATA } from '@/mock-data';
import { ModelRecord } from '@/types';

// Simple in-memory data store for the demo
const STORE: Record<string, ModelRecord[]> = { ...INITIAL_DATA };

export function getRecords(tenantId: string, moduleName: string, modelName: string) {
  const key = `${tenantId}:${moduleName}:${modelName}`;
  return STORE[key] || [];
}

export function getRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
  const records = getRecords(tenantId, moduleName, modelName);
  return records.find((r) => r.id === id);
}

export function insertRecord(tenantId: string, moduleName: string, modelName: string, data: ModelRecord) {
  const key = `${tenantId}:${moduleName}:${modelName}`;
  if (!STORE[key]) STORE[key] = [];
  const newRecord = { ...data, id: Math.random().toString(36).substring(7) };
  STORE[key].push(newRecord);
  return newRecord;
}

export function updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: ModelRecord) {
  const key = `${tenantId}:${moduleName}:${modelName}`;
  const records = STORE[key] || [];
  const index = records.findIndex((r) => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    return records[index];
  }
  return null;
}

export function deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
  const key = `${tenantId}:${moduleName}:${modelName}`;
  const records = STORE[key] || [];
  const index = records.findIndex((r) => r.id === id);
  if (index !== -1) {
    const deleted = records.splice(index, 1);
    return deleted[0];
  }
  return null;
}
