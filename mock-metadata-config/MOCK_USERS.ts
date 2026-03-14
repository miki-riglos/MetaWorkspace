import { UserRecord } from '@/metadata/User';

export const MOCK_USERS: UserRecord[] = [
  { id: 'u1', email: 'admin@example.com', name: 'System Admin', tenantIds: ['tenant-1', 'tenant-2', 'tenant-admin'] },
  { id: 'u2', email: 'user1@example.com', name: 'Acme User', tenantIds: ['tenant-1'] },
  { id: 'u3', email: 'user2@example.com', name: 'Globex User', tenantIds: ['tenant-2'] },
];
