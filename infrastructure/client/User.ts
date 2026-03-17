import { Tenant } from './Tenant';
import { UserStub } from '../stub/UserStub';
import { TenantStub } from '../stub/TenantStub';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantStubs: TenantStub[];  // entire hierhachy of modules and views
  public readonly tenants: Tenant[];          // each tenant module to be loaded as needed

  constructor(stub: UserStub) {
    this.id = stub.id;
    this.email = stub.email;
    this.name = stub.name;
    this.tenantStubs = stub.tenantStubs;
    this.tenants = this.tenantStubs.map(ts => new Tenant(ts, this));
  }
}
