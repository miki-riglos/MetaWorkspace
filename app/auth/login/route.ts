import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/adminService';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = adminService.getUser(email);

    return NextResponse.json(user.toStub());

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
