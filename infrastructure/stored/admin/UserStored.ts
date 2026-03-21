export type UserStored = {
  id: string;
  email: string;
  name: string;
  tenantAssignments: TenantAssignment[];
};

export type TenantAssignment = {
  tenantId: string;
  moduleNames: string[];
}