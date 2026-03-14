import { UserStub } from '@/metadata/User';
import { TenantStub } from '@/metadata/Tenant';
import { Tenant } from './Tenant';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantStubs: TenantStub[];  // entire hierhachy of modules and views
  public readonly tenants: Tenant[];          // each tenat module to be loaded as needed

  constructor(stub: UserStub) {
    this.id = stub.id;
    this.email = stub.email;
    this.name = stub.name;
    this.tenantStubs = stub.tenantStubs;
    this.tenants = this.tenantStubs.map(ts => new Tenant(ts, this));
  }
}
