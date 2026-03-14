import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/server-registries/tenantRegistry';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string }> }
) {
  try {
    const { tenantId, moduleName } = await params;
    
    const tenant = tenantRegistry.get(tenantId);
    if (!tenant) {
      return NextResponse.json({ error: `Tenant ${tenantId} not found` }, { status: 404 });
    }

    const mod = tenant.getModule(moduleName);
    if (!mod) {
      return NextResponse.json({ error: `Module ${moduleName} not found in tenant ${tenantId}` }, { status: 404 });
    }

    return NextResponse.json(mod.toClientConfig());
  } catch (error) {
    console.error('API Error (GET /cfg):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
