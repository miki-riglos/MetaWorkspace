import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/infrastructure/User';
import { UserStored } from '@/infrastructure/stored/UserStored';

const MOCK_USERS: UserStored[] = [
  {
    id: 'u1',
    email: 'admin@example.com',
    name: 'System Admin',
    tenantAssignments: [{
      tenantId: 'tenant-1', moduleNames: ['sales']
    }, {
      tenantId: 'tenant-2', moduleNames: ['inventory']
    }, {
      tenantId: 'tenant-admin', moduleNames: ['metaManager']
    }]
  },
  {
    id: 'u2',
    email: 'user1@example.com',
    name: 'Acme User',
    tenantAssignments: [{ tenantId: 'tenant-1', moduleNames: ['sales'] }]
  },
  {
    id: 'u3',
    email: 'user2@example.com',
    name: 'Globex User',
    tenantAssignments: [{ tenantId: 'tenant-2', moduleNames: ['inventory'] }]
  },
];

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const userStored = MOCK_USERS.find(u => u.email === email);
    if (!userStored) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = new User(userStored);

    return NextResponse.json(user.toStub());

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
