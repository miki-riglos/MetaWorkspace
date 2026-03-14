import { Module, ModuleConfig, ModuleStub } from './Module';
import { TenantConfig as ClientTenantConfig } from '../client-metadata/Tenant';

export interface TenantConfig {
  id: string;
  name: string;
  modules: ModuleConfig[];
}

export interface TenantStub {
  id: string;
  name: string;
  moduleStubs: ModuleStub[];
}

export class Tenant {
  public readonly id: string;
  public readonly name: string;
  public readonly modules: Module[];

  constructor(config: TenantConfig) {
    this.id = config.id;
    this.name = config.name;
    this.modules = config.modules.map(m => new Module(m));
  }

  getModule(name: string): Module | undefined {
    return this.modules.find(m => m.name === name);
  }

  toClientConfig(): ClientTenantConfig {
    return {
      id: this.id,
      name: this.name,
      modules: this.modules.map(m => m.toClientConfig()),
    };
  }

  toStub(): TenantStub {
    return {
      id: this.id,
      name: this.name,
      moduleStubs: this.modules.map(m => m.toStub()),
    };
  }
}
