import { Model, ModelConfig } from './Model';
import { View, ViewInit, ViewStub } from './View';
import { ModuleConfig as ClientModuleConfig } from '../client-metadata/Module';

export interface ModuleConfig {
  name: string;
  label: string;
  models: ModelConfig[];
  views: ViewInit[];
}

export interface ModuleStub {
  name: string;
  label: string;
  views: ViewStub[];
}

export class Module {
  public readonly name: string;
  public readonly label: string;
  public readonly models: Model[];
  public readonly views: View[];

  constructor(config: ModuleConfig) {
    this.name = config.name;
    this.label = config.label;
    this.models = config.models.map(m => new Model(m));
    this.views = config.views.map(v => new View(v));
  }

  getModel(name: string): Model | undefined {
    return this.models.find(m => m.name === name);
  }

  getView(name: string): View | undefined {
    return this.views.find(v => v.name === name);
  }

  toStub(): ModuleStub {
    return {
      name: this.name,
      label: this.label,
      views: this.views
        .filter(v => v.isMenuOption)
        .map(v => v.toStub()),
    };
  }

  toClientConfig(): ClientModuleConfig {
    return {
      name: this.name,
      label: this.label,
      models: this.models.map(m => m.toClientConfig()),
      views: this.views.map(v => v.toClientConfig()),
    };
  }
}
