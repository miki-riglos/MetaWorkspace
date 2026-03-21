import { TenantStored } from '../stored/admin/TenantStored';
import { TenantDto } from '../dto/TenantDto';
import { Module } from './Module';
import { TenantStub } from '../stub/TenantStub';
import { metadataService } from '@/lib/metadataService';

export class Tenant {
  public readonly id: string;
  public readonly name: string;
  public readonly modules: Module[];

  constructor(stored: TenantStored) {
    this.id = stored.id;
    this.name = stored.name;
    this.modules = stored.moduleNames.map(moduleName => new Module(metadataService.getModuleStored(moduleName)));
  }

  getModule(moduleName: string): Module {
    const module$ = this.modules.find(m => m.name === moduleName);
    if (!module$) {
      throw new Error(`Module ${moduleName} not found in tenant ${this.id}`);
    }
    return module$;
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
