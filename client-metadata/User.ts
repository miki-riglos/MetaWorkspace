import { UserStub } from '@/metadata/User';
import { TenantStub } from '@/metadata/Tenant';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenantStubs: TenantStub[];

  constructor(stub: UserStub) {
    this.id = stub.id;
    this.email = stub.email;
    this.name = stub.name;
    this.tenantStubs = stub.tenantStubs;
  }
}
