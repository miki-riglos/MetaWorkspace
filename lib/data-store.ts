import { ModelRecord } from '@/types';
import fs from 'fs';
import path from 'path';

// Ensure db directory exists
const dbDir = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

function getFilePath(tenantId: string, moduleName: string, modelName: string) {
  return path.join(dbDir, tenantId, moduleName, `${modelName}.json`);
}

function readData(tenantId: string, moduleName: string, modelName: string): ModelRecord[] {
  const filePath = getFilePath(tenantId, moduleName, modelName);
  
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
  writeData(tenantId, moduleName, modelName, []);
  
  return [];
}

function writeData(tenantId: string, moduleName: string, modelName: string, data: ModelRecord[]) {
  const filePath = getFilePath(tenantId, moduleName, modelName);
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

export function getRecords(tenantId: string, moduleName: string, modelName: string) {
  return readData(tenantId, moduleName, modelName);
}

export function getRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
  const records = getRecords(tenantId, moduleName, modelName);
  return records.find((r) => r.id === id);
}

export function insertRecord(tenantId: string, moduleName: string, modelName: string, data: ModelRecord) {
  const records = readData(tenantId, moduleName, modelName);
  const newRecord = { ...data, id: Math.random().toString(36).substring(7) };
  records.push(newRecord);
  writeData(tenantId, moduleName, modelName, records);
  return newRecord;
}

export function updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: ModelRecord) {
  const records = readData(tenantId, moduleName, modelName);
  const index = records.findIndex((r) => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    writeData(tenantId, moduleName, modelName, records);
    return records[index];
  }
  return null;
}

export function deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string) {
  const records = readData(tenantId, moduleName, modelName);
  const index = records.findIndex((r) => r.id === id);
  if (index !== -1) {
    const deleted = records.splice(index, 1);
    writeData(tenantId, moduleName, modelName, records);
    return deleted[0];
  }
  return null;
}
