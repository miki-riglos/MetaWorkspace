import { NextRequest, NextResponse } from 'next/server';
import { getDataService } from '@/serviceRegistry';
import { ModelRecord } from '@/infrastructure/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string; id: string }> }
) {
  try {
    const { tenantId, moduleName, modelName, id } = await params;
    const record = getDataService().getRecord(tenantId, moduleName, modelName, id);

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
    const { tenantId, moduleName, modelName, id } = await params;
    const data = await req.json() as ModelRecord;

    const updatedRecord = getDataService().updateRecord(tenantId, moduleName, modelName, id, data);

    if (!updatedRecord) {
      return NextResponse.json({ error: 'Record not found or could not be updated' }, { status: 404 });
    }

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('API Error (PUT Record):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string; id: string }> }
) {
  try {
    const { tenantId, moduleName, modelName, id } = await params;
    const deletedRecord = dataService.deleteRecord(tenantId, moduleName, modelName, id);

    if (!deletedRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: deletedRecord });
  } catch (error) {
    console.error('API Error (DELETE Record):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
