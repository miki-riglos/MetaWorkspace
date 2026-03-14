import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_DATA } from '@/mock-data';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string; id: string }> }
) {
  try {
    const { tenantId, moduleName, modelName, id } = await params;
    
    const key = `${tenantId}:${moduleName}:${modelName}`;
    let records = INITIAL_DATA[key];

    if (!records) {
      const lowerKey = key.toLowerCase();
      const foundKey = Object.keys(INITIAL_DATA).find(k => k.toLowerCase() === lowerKey);
      if (foundKey) {
        records = INITIAL_DATA[foundKey];
      }
    }

    const record = (records || []).find(r => String(r.id) === String(id));

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('API Error (GET Record):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string; id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    return NextResponse.json({ id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string; id: string }> }
) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
