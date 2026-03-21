import path from 'path';
import { IDataService } from '@/infrastructure/types';
import { FsDataService } from '@/lib/FsDataService';

const globalAny: any = global;

/**
 * Retrieves the DataService instance.
 * Preserves the instance across Hot Module Replacement (HMR) reloads.
 */
export const getDataService = (): IDataService => {
  if (!globalAny.__dataService) {
    globalAny.__dataService = new FsDataService(path.join(process.cwd(), './db/data'));
  }
  return globalAny.__dataService;
};
