import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MetadataService } from '../../lib/MetadataService';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('MetadataService', () => {
  let dbDir: string;
  let metadatService: MetadataService;
  const moduleName = 'test-module';

  beforeEach(() => {
    // Create a temporary directory for testing
    dbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'metadata-service-test-'));
    metadatService = new MetadataService(dbDir);
  });

  afterEach(() => {
    // Clean up the temporary directory
    fs.rmSync(dbDir, { recursive: true, force: true });
  });

  it('should read from file system and cache it', () => {
    const mockModule = { id: 'test-module', name: 'Test' };

    // Set up the file structure expected by the service
    const moduleDir = path.join(dbDir, moduleName);
    const filePath = path.join(moduleDir, 'index.json');

    fs.mkdirSync(moduleDir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(mockModule));

    // Initial read (from file)
    const result1 = metadatService.getModuleStored(moduleName);
    expect(result1).toEqual(mockModule);

    // Modify the file to prove it reads from cache next time
    fs.writeFileSync(filePath, JSON.stringify({ id: 'changed', name: 'Changed' }));

    // Second read (from cache)
    const result2 = metadatService.getModuleStored(moduleName);
    expect(result2).toEqual(mockModule); // Should still be the original mockModule
  });

  it('should throw an error if the module does not exist', () => {
    expect(() => metadatService.getModuleStored('missing-module')).toThrow(/Module missing-module not found/);
  });
});
