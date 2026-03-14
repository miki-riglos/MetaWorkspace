import { UserStub } from '@/metadata/User';
import { Tenant } from '@/client-metadata/Tenant';

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly tenants: Tenant[];

  constructor(stub: UserStub) {
    this.id = stub.id;
    this.email = stub.email;
    this.name = stub.name;
    this.tenants = stub.tenantStubs.map(t => new Tenant(t));
  }
}
