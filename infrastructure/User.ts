import { UserStored, TenantAssignment } from './stored/UserStored';
import { TenantStored } from './stored/TenantStored';
import { UserStub } from './stub/UserStub';
import { Tenant } from './Tenant';
import { TenantStub } from './stub/TenantStub';
import { metadataService } from '@/lib/metadataService';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantStubs: TenantStub[];

  constructor(stored: UserStored) {
    this.id = stored.id;
    this.email = stored.email;
    this.name = stored.name;
    this.tenantStubs = stored.tenantAssignments.map(ta => metadataService.getTenant(ta.tenantId)!.toStub());
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
