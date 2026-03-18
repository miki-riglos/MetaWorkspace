import { describe, test, expect } from 'vitest';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const TENANT_ID = 'test-tenant';
const MODULE_NAME = 'test-module';
const MODEL_NAME = 'test-model';

const BASE_PATH = `${API_URL}/api/${TENANT_ID}/${MODULE_NAME}/${MODEL_NAME}`;

let createdRecordId: string;

describe('API Endpoints CRUD verification', () => {
  // 1. Initial GET - should return an array (empty or not)
  test('GET /api/[tenant]/[module]/[model] returns a list', async () => {
    const res = await fetch(BASE_PATH);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  // 2. POST - create a new record
  test('POST /api/[tenant]/[module]/[model] creates a new record', async () => {
    const payload = { title: 'Test Record', timestamp: Date.now() };
    
    const res = await fetch(BASE_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    expect(res.status).toBe(201);
    
    const data = await res.json();
    expect(data.id).toBeDefined();
    expect(data.title).toBe(payload.title);
    
    // Save the ID for subsequent tests
    createdRecordId = data.id;
  });

  // 3. GET [id] - fetch the newly created record
  test('GET /api/[tenant]/[module]/[model]/[id] retrieves a specific record', async () => {
    expect(createdRecordId).toBeDefined();
    
    const res = await fetch(`${BASE_PATH}/${createdRecordId}`);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.id).toBe(createdRecordId);
  });

  // 4. PUT [id] - update the existing record
  test('PUT /api/[tenant]/[module]/[model]/[id] updates the record', async () => {
    expect(createdRecordId).toBeDefined();
    
    const updatePayload = { title: 'Updated Test Record' };
    const res = await fetch(`${BASE_PATH}/${createdRecordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.id).toBe(createdRecordId);
    expect(data.title).toBe(updatePayload.title);
  });

  // 5. DELETE [id] - remove the record
  test('DELETE /api/[tenant]/[module]/[model]/[id] removes the record', async () => {
    expect(createdRecordId).toBeDefined();
    
    const res = await fetch(`${BASE_PATH}/${createdRecordId}`, {
      method: 'DELETE'
    });
    
    // Some APIs return 204 No Content or 200 with success msg depending on implementation
    expect([200, 204]).toContain(res.status);
    
    // Verify it's actually deleted
    const verifyRes = await fetch(`${BASE_PATH}/${createdRecordId}`);
    expect(verifyRes.status).toBe(404);
  });
});
