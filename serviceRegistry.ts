import path from 'path';
import { IDataService } from '@/infrastructure/types';
import { FsDataService } from '@/lib/FsDataService';
import { MetadataService } from '@/lib/MetadataService';
import { AdminService } from '@/lib/AdminService';

// reference to preserve instances across HMR reloads
const globalAny: any = global;

export const getDataService = (): IDataService => {
  if (!globalAny.__dataService) {
    globalAny.__dataService = new FsDataService(path.join(process.cwd(), './db/data'));
  }
  return globalAny.__dataService;
};

export const getMetadataService = (): MetadataService => {
  if (!globalAny.__metadataService) {
    globalAny.__metadataService = new MetadataService(path.join(process.cwd(), './db/metadata'));
  }
  return globalAny.__metadataService;
};

export const getAdminService = (): AdminService => {
  if (!globalAny.__adminService) {
    globalAny.__adminService = new AdminService(path.join(process.cwd(), './db/admin'));
  }
  return globalAny.__adminService;
};