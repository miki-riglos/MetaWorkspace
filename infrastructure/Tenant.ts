import { TenantStored } from './stored/TenantStored';
import { TenantDto } from './dto/TenantDto';
import { Module } from './Module';
import { TenantStub } from './stub/TenantStub';

export class Tenant {
  public readonly id: string;
  public readonly name: string;
  public readonly modules: Module[];

  constructor(stored: TenantStored) {
    this.id = stored.id;
    this.name = stored.name;
    this.modules = stored.modules.map(m => new Module(m));
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

  toDto(): TenantDto {
    return {
      id: this.id,
      name: this.name,
      modules: this.modules.map(m => m.toDto()),
    };
  }
}
