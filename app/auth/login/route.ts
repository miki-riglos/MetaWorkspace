import { NextRequest, NextResponse } from 'next/server';
import { getAdminService } from '@/serviceRegistry';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const adminService = getAdminService();
    const user = adminService.getUser(email);

    return NextResponse.json(user.toStub());

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
