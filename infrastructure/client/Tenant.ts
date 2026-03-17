import { User } from './User';
import { Module } from './Module';
import { TenantStub } from '../stub/TenantStub';
import { ConfigService } from '@/services/ConfigService';

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
