import { ModuleStub } from '../metadata/Module';
import { TenantStub } from '../metadata/Tenant';

export class Tenant {
  public readonly id: string;
  public readonly name: string;
  public readonly moduleStubs: ModuleStub[];
  
  constructor(stub: TenantStub) {
    this.id = stub.id;
    this.name = stub.name;
    this.moduleStubs = stub.moduleStubs;
  }
}
