import { ModuleDto } from './ModuleDto';

export type TenantDto = {
  id: string;
  name: string;
  modules: ModuleDto[];
}

