import { NextRequest, NextResponse } from 'next/server';
import { getDataService } from '@/serviceRegistry';
import { ModelRecord } from '@/infrastructure/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string }> }
) {
  try {
    const { tenantId, moduleName, modelName } = await params;
    const dataService = getDataService();
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

    const dataService = getDataService();
    const newRecord = dataService.insertRecord(tenantId, moduleName, modelName, data);

    return NextResponse.json(newRecord, { status: 201 });

  } catch (error) {
    console.error('API Error (POST):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
