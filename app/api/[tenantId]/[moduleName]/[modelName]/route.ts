import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';
import { ModelRecord } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string }> }
) {
  try {
    const { tenantId, moduleName, modelName } = await params;
    const records = dataService.getRecords(tenantId, moduleName, modelName);

    return NextResponse.json(records);
  } catch (error) {
    console.error('API Error (GET):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string }> }
) {
  try {
    const { tenantId, moduleName, modelName } = await params;
    const data = await req.json() as ModelRecord;

    const newRecord = dataService.insertRecord(tenantId, moduleName, modelName, data);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('API Error (POST):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
