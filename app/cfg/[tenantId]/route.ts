import { NextRequest, NextResponse } from 'next/server';
import { metadataService } from '@/lib/metadataService';

export async function GET(
   req: NextRequest,
   { params }: { params: Promise<{ tenantId: string }> }
) {
   try {
      const { tenantId } = await params;
      const tenant = metadataService.getTenant(tenantId);

      if (!tenant) {
         return NextResponse.json({ error: `Tenant ${tenantId} not found` }, { status: 404 });
      }

      return NextResponse.json(tenant.toDto());

   } catch (error) {
      console.error('API Error (GET /cfg/[tenantId]):', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}
