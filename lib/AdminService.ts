import fs from 'fs';
import path from 'path';
import { TenantStored } from '../infrastructure/stored/admin/TenantStored';
import { UserStored } from '../infrastructure/stored/admin/UserStored';
import { User } from '../infrastructure/server/User';
import { Tenant } from '../infrastructure/server/Tenant';

export class AdminService {
  private _dbDir: string;
  private _usersCache: Map<string, User> = new Map();
  private _tenantsCache: Map<string, Tenant> = new Map();

  constructor(dbDir: string) {
    this._dbDir = dbDir;
  }

  private getUsersStored(): UserStored[] {
    const filePath = path.join(this._dbDir, 'users.json');
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as UserStored[];
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
      }
    }
    return [];
  }

  getUser(email: string): User {
    if (this._usersCache.has(email)) {
      return this._usersCache.get(email)!;
    }

    const usersStored = this.getUsersStored();
    const userStored = usersStored.find(u => u.email === email);
    if (!userStored) {
      throw new Error(`User ${email} not found`);
    }

    const tenantStubs = userStored.tenantAssignments.map((ta: { tenantId: string }) => this.getTenant(ta.tenantId).toStub());
    const user = new User(userStored, tenantStubs);
    this._usersCache.set(email, user);
    return user;
  }

  private getTenantsStored(): TenantStored[] {
    const filePath = path.join(process.cwd(), './db/admin/tenants.json');
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as TenantStored[];
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
      }
    }
    return [];
  }

  getTenant(tenantId: string): Tenant {
    if (this._tenantsCache.has(tenantId)) {
      return this._tenantsCache.get(tenantId)!;
    }

    const tenantsStored = this.getTenantsStored();
    const tenantStored = tenantsStored.find(t => t.id === tenantId);
    if (!tenantStored) {
      throw new Error(`Tenant ${tenantId} not found`);
    }
    const tenant = new Tenant(tenantStored);
    this._tenantsCache.set(tenantId, tenant);
    return tenant;
  }

  getTenantModule(tenantId: string, moduleName: string) {
    const tenant = this.getTenant(tenantId);
    return tenant.getModule(moduleName);
  }
}
