import { TenantStub } from './TenantStub';

export type UserStub = {
  id: string;
  email: string;
  name: string;
  tenantStubs: TenantStub[];
};
