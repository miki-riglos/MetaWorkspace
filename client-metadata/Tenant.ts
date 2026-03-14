import { TenantStub } from '@/metadata/Tenant';
import { Module, ModuleConfig } from './Module';
import { ConfigService } from '@/services/ConfigService';
import { User } from './User';

export interface TenantConfig {
  id: string;
  name: string;
  modules: ModuleConfig[];
}

export class Tenant {
  private _configService: ConfigService;

  public readonly user: User;
  public readonly id: string;
  public readonly name: string;
  public readonly modules: Module[] = [];

  constructor(stub: TenantStub, user: User) {
    this.user = user;
    this.id = stub.id;
    this.name = stub.name;

    this._configService = new ConfigService(this.id);
  }

  async getModule(moduleName: string): Promise<Module> {
    // TODO: cache modules
    const moduleConfig = await this._configService.getModule(moduleName);
    return new Module(moduleConfig, this);
  }
}
