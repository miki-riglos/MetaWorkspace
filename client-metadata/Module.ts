import { DataService } from '@/services/DataService';
import { Model, ModelConfig } from './Model';
import { Tenant } from './Tenant';
import { View, ViewConfig } from './View';

export interface ModuleConfig {
  name: string;
  label: string;
  models: ModelConfig[];
  views: ViewConfig[];
}

export class Module {
  public readonly tenant: Tenant;
  public readonly name: string;
  public readonly label: string;
  public readonly models: Model[];
  public readonly views: View[];

  public readonly dataService: DataService;

  constructor(config: ModuleConfig, tenant: Tenant) {
    this.tenant = tenant;
    this.name = config.name;
    this.label = config.label;
    this.models = config.models.map(m => new Model(m, this));
    this.views = config.views.map(v => new View(v, this));

    this.dataService = new DataService(this.tenant.id);
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
