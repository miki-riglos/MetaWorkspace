import { DataService } from '@/services/DataService';
import { Model } from './Model';
import { Tenant } from './Tenant';
import { View } from './View';
import { ModuleDto } from '../dto/ModuleDto';

export class Module {
  public readonly tenant: Tenant;
  public readonly name: string;
  public readonly label: string;
  public readonly models: Model[];
  public readonly views: View[];

  public readonly dataService: DataService;

  constructor(dto: ModuleDto, tenant: Tenant) {
    this.tenant = tenant;
    this.name = dto.name;
    this.label = dto.label;
    this.models = dto.models.map(m => new Model(m, this));
    this.views = dto.views.map(v => new View(v, this));

    this.dataService = new DataService(this.tenant.id, this.name);
  }

  getModel(modelName: string): Model {
    const model = this.models.find(m => m.name === modelName);
    if (!model) throw new Error(`Model ${modelName} not found in Module ${this.name}`);
    return model;
  }

  getView(viewName: string): View {
    const view = this.views.find(v => v.name === viewName);
    if (!view) throw new Error(`View ${viewName} not found in Module ${this.name}`);
    return view;
  }
}
