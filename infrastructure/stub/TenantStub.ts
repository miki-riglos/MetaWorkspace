import { ModuleStub } from './ModuleStub';

export type TenantStub = {
  id: string;
  name: string;
  moduleStubs: ModuleStub[];
}
