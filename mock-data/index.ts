import { tenant1Data } from './tenant-1';
import { tenant2Data } from './tenant-2';
import { tenantAdminData } from './tenant-admin';

export const INITIAL_DATA: Record<string, any[]> = {};

const processTenantData = (tenantId: string, data: Record<string, any[]>) => {
  Object.entries(data).forEach(([key, records]) => {
    INITIAL_DATA[`${tenantId}:${key}`] = records;
  });
};

processTenantData('tenant-1', tenant1Data);
processTenantData('tenant-2', tenant2Data);
processTenantData('tenant-admin', tenantAdminData);
