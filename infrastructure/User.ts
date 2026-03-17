import { UserStored } from './stored/UserStored';
import { TenantStored } from './stored/TenantStored';
import { UserStub } from './stub/UserStub';
import { Tenant } from './Tenant';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantIds: string[];

  constructor(stored: UserStored) {
    this.id = stored.id;
    this.email = stored.email;
    this.name = stored.name;
    this.tenantIds = stored.tenantIds;
  }

  toStub(tenantConfigs: TenantStored[]): UserStub {
    const tenantStubs = tenantConfigs
      .filter(config => this.tenantIds.includes(config.id))
      .map(config => new Tenant(config).toStub());

    return {
      id: this.id,
      email: this.email,
      name: this.name,
      tenantStubs,
    };
  }
}
