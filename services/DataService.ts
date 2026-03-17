import { ModelRecord } from "@/types";

export class DataService {
  private readonly _tenantId: string;
  private readonly _moduleName: string;

  constructor(tenantId: string, moduleName: string) {
    this._tenantId = tenantId;
    this._moduleName = moduleName;
  }

  async getRecords(modelName: string): Promise<ModelRecord[]> {
    const response = await fetch(`/api/${this._tenantId}/${this._moduleName}/${modelName}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch records');
    }
    return response.json();
  }

  async getRecord(moduleName: string, modelName: string, id: string): Promise<ModelRecord> {
    const response = await fetch(`/api/${this._tenantId}/${moduleName}/${modelName}/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch record');
    }
    return response.json();
  }

  async createRecord(moduleName: string, modelName: string, data: ModelRecord): Promise<ModelRecord> {
    const response = await fetch(`/api/${this._tenantId}/${moduleName}/${modelName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create record');
    }
    return response.json();
  }

  async updateRecord(moduleName: string, modelName: string, id: string, data: ModelRecord): Promise<ModelRecord> {
    const response = await fetch(`/api/${this._tenantId}/${moduleName}/${modelName}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update record');
    }
    return response.json();
  }

  async deleteRecord(moduleName: string, modelName: string, id: string): Promise<ModelRecord> {
    const response = await fetch(`/api/${this._tenantId}/${moduleName}/${modelName}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete record');
    }
    return response.json();
  }
}
