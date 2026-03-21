import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/_adminService';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string }> }
) {
  try {
    const { tenantId, moduleName } = await params;

    const module$ = adminService.getTenantModule(tenantId, moduleName);

    return NextResponse.json(module$.toDto());

  } catch (error) {
    console.error('API Error (GET /cfg/[tenantId]/[moduleName]):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
