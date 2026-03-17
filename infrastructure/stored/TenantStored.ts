import { ModuleStored } from "./ModuleStored";

export type TenantStored = {
  id: string;
  name: string;
  modules: ModuleStored[];
}

