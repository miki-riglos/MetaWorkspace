export class DataService {
  /**
   * Fetches all records for a given model.
   */
  static async getRecords(tenantId: string, moduleName: string, modelName: string): Promise<any[]> {
    const response = await fetch(`/api/${tenantId}/${moduleName}/${modelName}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch records');
    }
    return response.json();
  }

  /**
   * Fetches a single record by ID.
   */
  static async getRecord(tenantId: string, moduleName: string, modelName: string, id: string): Promise<any> {
    const response = await fetch(`/api/${tenantId}/${moduleName}/${modelName}/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch record');
    }
    return response.json();
  }

  /**
   * Creates a new record.
   */
  static async createRecord(tenantId: string, moduleName: string, modelName: string, data: any): Promise<any> {
    const response = await fetch(`/api/${tenantId}/${moduleName}/${modelName}`, {
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

  /**
   * Updates an existing record.
   */
  static async updateRecord(tenantId: string, moduleName: string, modelName: string, id: string, data: any): Promise<any> {
    const response = await fetch(`/api/${tenantId}/${moduleName}/${modelName}/${id}`, {
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

  /**
   * Deletes a record.
   */
  static async deleteRecord(tenantId: string, moduleName: string, modelName: string, id: string): Promise<any> {
    const response = await fetch(`/api/${tenantId}/${moduleName}/${modelName}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete record');
    }
    return response.json();
  }
}
