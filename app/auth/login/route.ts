import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USERS } from '@/mock-metadata-config/MOCK_USERS';
import { MOCK_TENANTS } from '@/mock-metadata-config/MOCK_TENANTS';
import { User } from '@/infrastructure/User';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const userRecord = MOCK_USERS.find(u => u.email === email);
    if (!userRecord) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = new User(userRecord);

    // Filter tenants that the user has access to
    const userTenantConfigs = MOCK_TENANTS.filter(t => user.tenantIds.includes(t.id));

    return NextResponse.json(user.toStub(userTenantConfigs));
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
