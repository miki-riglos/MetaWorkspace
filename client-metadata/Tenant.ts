import { Module, ModuleConfig } from './Module';

export interface TenantConfig {
  id: string;
  name: string;
  modules: ModuleConfig[];
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
}
