import { Tenant, TenantRecord, TenantStub } from './Tenant';

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  tenantIds: string[];
};

export interface UserStub {
  id: string;
  email: string;
  name: string;
  tenantStubs: TenantStub[];
}

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantIds: string[];

  constructor(record: UserRecord) {
    this.id = record.id;
    this.email = record.email;
    this.name = record.name;
    this.tenantIds = record.tenantIds;
  }

  toStub(tenantConfigs: TenantRecord[]): UserStub {
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
