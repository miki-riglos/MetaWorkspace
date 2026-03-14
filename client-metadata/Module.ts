import { Model, ModelConfig } from './Model';
import { View, ViewInit } from './View';

export interface ModuleConfig {
  name: string;
  label: string;
  models: ModelConfig[];
  views: ViewInit[];
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
}
