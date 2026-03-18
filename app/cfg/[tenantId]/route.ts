import { NextRequest, NextResponse } from 'next/server';
import { Tenant } from '@/infrastructure/Tenant';
import { TenantStored } from '@/infrastructure/stored/TenantStored';
import { ModuleStored } from '@/infrastructure/stored/ModuleStored';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const dbMetaDir = path.join(process.cwd(), 'db-metadata');
    const tenantFilePath = path.join(dbMetaDir, 'tenants', `${tenantId}.json`);

    if (!fs.existsSync(tenantFilePath)) {
       return NextResponse.json({ error: `Tenant ${tenantId} not found` }, { status: 404 });
    }

    const tenantFileData = JSON.parse(fs.readFileSync(tenantFilePath, 'utf-8'));
    const moduleNames: string[] = tenantFileData.modules || [];
    
    const modules: ModuleStored[] = [];

    for (const moduleName of moduleNames) {
      const moduleDir = path.join(dbMetaDir, moduleName);
      if (!fs.existsSync(moduleDir)) continue;

      const indexContent = fs.readFileSync(path.join(moduleDir, 'index.json'), 'utf-8');
      const moduleData = JSON.parse(indexContent);

      const modelsDir = path.join(moduleDir, 'models');
      const viewsDir = path.join(moduleDir, 'views');

      const models = [];
      if (fs.existsSync(modelsDir)) {
         const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.json'));
         for (const file of modelFiles) {
            models.push(JSON.parse(fs.readFileSync(path.join(modelsDir, file), 'utf-8')));
         }
      }

      const views = [];
      if (fs.existsSync(viewsDir)) {
         const viewFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.json'));
         for (const file of viewFiles) {
            views.push(JSON.parse(fs.readFileSync(path.join(viewsDir, file), 'utf-8')));
         }
      }

      modules.push({
         name: moduleData.name,
         label: moduleData.label,
         models,
         views
      });
    }

    const tenantStored: TenantStored = {
       id: tenantFileData.id,
       name: tenantFileData.name,
       modules
    };

    const tenant = new Tenant(tenantStored);
    return NextResponse.json(tenant.toDto());

  } catch (error) {
    console.error('API Error (GET /cfg/[tenantId]):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
