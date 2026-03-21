import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminService } from '@/lib/AdminService';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('AdminService', () => {
  let dbDir: string;
  let adminService: AdminService;
  let cwdSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Create a temporary directory for testing
    dbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'admin-service-test-'));
    adminService = new AdminService(dbDir);

    // Mock process.cwd() to point to our temp dir so we can control ./db/admin/tenants.json
    cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(dbDir);
  });

  afterEach(() => {
    // Clean up the temporary directory
    fs.rmSync(dbDir, { recursive: true, force: true });
    cwdSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it('should read from file system and cache users and tenants', () => {
    const mockUser = {
      id: 'u1',
      email: 'test@example.com',
      name: 'Test User',
      tenantAssignments: [
        { tenantId: 't1', moduleNames: ['m1'] }
      ]
    };
    const mockTenant = {
      id: 't1',
      name: 'Tenant 1',
      moduleNames: ['m1', 'm2']
    };

    // Setup users.json in dbDir
    fs.writeFileSync(path.join(dbDir, 'users.json'), JSON.stringify([mockUser]));

    // Setup ./db/admin/tenants.json in mocked cwd (which is dbDir)
    const adminDbDir = path.join(dbDir, 'db', 'admin');
    fs.mkdirSync(adminDbDir, { recursive: true });
    fs.writeFileSync(path.join(adminDbDir, 'tenants.json'), JSON.stringify([mockTenant]));

    // Setup ./db/metadata/m1/index.json and m2
    const metadataDbDir1 = path.join(dbDir, 'db', 'metadata', 'm1');
    fs.mkdirSync(metadataDbDir1, { recursive: true });
    fs.writeFileSync(path.join(metadataDbDir1, 'index.json'), JSON.stringify({ id: 'm1', name: 'Module 1', models: [], views: [] }));

    const metadataDbDir2 = path.join(dbDir, 'db', 'metadata', 'm2');
    fs.mkdirSync(metadataDbDir2, { recursive: true });
    fs.writeFileSync(path.join(metadataDbDir2, 'index.json'), JSON.stringify({ id: 'm2', name: 'Module 2', models: [], views: [] }));

    // Initial read (from file)
    const user1 = adminService.getUser('test@example.com');
    expect(user1.email).toBe('test@example.com');
    expect(user1.name).toBe('Test User');

    const tenant1 = adminService.getTenant('t1');
    expect(tenant1.id).toBe('t1');
    expect(tenant1.name).toBe('Tenant 1');

    // Modify the files to prove it reads from cache next time
    fs.writeFileSync(path.join(dbDir, 'users.json'), JSON.stringify([{ ...mockUser, name: 'Changed User' }]));
    fs.writeFileSync(path.join(adminDbDir, 'tenants.json'), JSON.stringify([{ ...mockTenant, name: 'Changed Tenant' }]));

    // Second read (from cache)
    const user2 = adminService.getUser('test@example.com');
    expect(user2.name).toBe('Test User'); // Should still be the original

    const tenant2 = adminService.getTenant('t1');
    expect(tenant2.name).toBe('Tenant 1'); // Should still be the original
  });

  it('should throw an error if the user does not exist', () => {
    // Setup empty users.json
    fs.writeFileSync(path.join(dbDir, 'users.json'), JSON.stringify([]));

    expect(() => adminService.getUser('missing@example.com')).toThrow(/User missing@example.com not found/);
  });

  it('should throw an error if the tenant does not exist', () => {
    // Setup empty tenants.json
    const adminDbDir = path.join(dbDir, 'db', 'admin');
    fs.mkdirSync(adminDbDir, { recursive: true });
    fs.writeFileSync(path.join(adminDbDir, 'tenants.json'), JSON.stringify([]));

    expect(() => adminService.getTenant('missing-t1')).toThrow(/Tenant missing-t1 not found/);
  });
});
