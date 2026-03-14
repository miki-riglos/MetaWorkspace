import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_DATA } from '@/mock-data';

// This is a generic mock data handler. 
// In a real app, this would connect to a database.

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; moduleName: string; modelName: string }> }
) {
  try {
    const { tenantId, moduleName, modelName } = await params;
    
    // Key format in INITIAL_DATA is tenantId:moduleName:modelName
    const key = `${tenantId}:${moduleName}:${modelName}`;
    
    // Try exact match first
    let data = INITIAL_DATA[key];

    // If not found, try case-insensitive match
    if (!data) {
      const lowerKey = key.toLowerCase();
      const foundKey = Object.keys(INITIAL_DATA).find(k => k.toLowerCase() === lowerKey);
      if (foundKey) {
        data = INITIAL_DATA[foundKey];
      }
    }

    return NextResponse.json(data || []);
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
    const data = await req.json();
    return NextResponse.json({ id: Math.random().toString(36).substring(7), ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
