import { UserStored } from '../stored/admin/UserStored';
import { UserStub } from '../stub/UserStub';
import { TenantStub } from '../stub/TenantStub';
import { adminService } from '@/lib/adminService';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantStubs: TenantStub[];

  constructor(stored: UserStored) {
    this.id = stored.id;
    this.email = stored.email;
    this.name = stored.name;

    this.tenantStubs = stored.tenantAssignments.map(ta => adminService.getTenant(ta.tenantId).toStub());
  }

  toStub(): UserStub {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      tenantStubs: this.tenantStubs,
    };
  }
}
