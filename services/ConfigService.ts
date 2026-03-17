import { ModuleDto } from '@/infrastructure/dto/ModuleDto';

export class ConfigService {
  private readonly _tenantId: string;

  constructor(tenantId: string) {
    this._tenantId = tenantId;
  }

  async getModule(moduleName: string): Promise<ModuleDto> {
    const response = await fetch(`/cfg/${this._tenantId}/${moduleName}`);

    if (!response.ok) {
      let errorMessage = 'Failed to fetch module config';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        errorMessage = `Server returned ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json() as ModuleDto;
  }
}
