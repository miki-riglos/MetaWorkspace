import { Module, ModuleRecord, ModuleStub } from './Module';
import { TenantConfig } from '../client-metadata/Tenant';

export interface TenantRecord {
  id: string;
  name: string;
  modules: ModuleRecord[];
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

  constructor(record: TenantRecord) {
    this.id = record.id;
    this.name = record.name;
    this.modules = record.modules.map(m => new Module(m));
  }

  getModule(name: string): Module | undefined {
    return this.modules.find(m => m.name === name);
  }

  toStub(): TenantStub {
    return {
      id: this.id,
      name: this.name,
      moduleStubs: this.modules.map(m => m.toStub()),
    };
  }

  toClientConfig(): TenantConfig {
    return {
      id: this.id,
      name: this.name,
      modules: this.modules.map(m => m.toClientConfig()),
    };
  }
}
