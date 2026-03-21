export type PropertyValue = any;

export type ModelRecord = Record<string, PropertyValue>;

export interface IDataService {
  getRecords(tenantId: string, moduleName: string, modelName: string): ModelRecord[];
  getRecord(tenantId: string, moduleName: string, modelName: string, id: string): ModelRecord | undefined;
  insertRecord(tenantId: string, moduleName: string, modelName: string, data: ModelRecord): ModelRecord;
  updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: ModelRecord): ModelRecord | null;
  deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string): ModelRecord | null;
}
