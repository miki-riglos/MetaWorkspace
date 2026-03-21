import { describe, it, expect } from 'vitest';
import { getAdminService } from '@/serviceRegistry';

describe('AdminService via serviceRegistry', () => {
  it('should retrieve admin@example.com and verify tenant stubs', () => {
    const adminService = getAdminService();
    const user = adminService.getUser('admin@example.com');

    expect(user).toBeDefined();
    expect(user.id).toBe('u1');
    expect(user.email).toBe('admin@example.com');
    expect(user.name).toBe('System Admin');

    // Verify the tenant stubs
    expect(user.tenantStubs).toBeDefined();
    expect(user.tenantStubs.length).toBe(3);

    const tenantIds = user.tenantStubs.map(stub => stub.id);
    expect(tenantIds).toContain('tenant-1');
    expect(tenantIds).toContain('tenant-2');
    expect(tenantIds).toContain('tenant-admin');
    
    // Optionally check if names are populated from the real data
    // Assuming tenant-1 is Acme, tenant-2 is Globex, tenant-admin is MetaManager or similar
    // For now, ensuring the array of stubs corresponds to the assignments is sufficient.
  });
});
