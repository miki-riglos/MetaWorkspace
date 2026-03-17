import { Model, ModelRecord } from './Model';
import { View, ViewRecord, ViewStub } from './View';
import { ModuleConfig } from '../client-metadata/Module';

export interface ModuleRecord {
  name: string;
  label: string;
  models: ModelRecord[];
  views: ViewRecord[];
}

export interface ModuleStub {
  name: string;
  label: string;
  viewStubs: ViewStub[];
}

export class Module {
  public readonly name: string;
  public readonly label: string;
  public readonly models: Model[];
  public readonly views: View[];

  constructor(record: ModuleRecord) {
    this.name = record.name;
    this.label = record.label;
    this.models = record.models.map(m => new Model(m));
    this.views = record.views.map(v => new View(v));
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
      viewStubs: this.views
        .filter(v => v.isMenuOption)
        .map(v => v.toStub()),
    };
  }

  toClientConfig(): ModuleConfig {
    return {
      name: this.name,
      label: this.label,
      models: this.models.map(m => m.toClientConfig()),
      views: this.views.map(v => v.toClientConfig()),
    };
  }
}
