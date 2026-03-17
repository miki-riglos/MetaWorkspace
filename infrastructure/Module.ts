import { ModuleStored } from './stored/ModuleStored';
import { Model } from './Model';
import { View } from './View';
import { ModuleDto } from './dto/ModuleDto';
import { ModuleStub } from './stub/ModuleStub';

export class Module {
  public readonly name: string;
  public readonly label: string;
  public readonly models: Model[];
  public readonly views: View[];

  constructor(stored: ModuleStored) {
    this.name = stored.name;
    this.label = stored.label;
    this.models = stored.models.map(m => new Model(m));
    this.views = stored.views.map(v => new View(v));
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

  toDto(): ModuleDto {
    return {
      name: this.name,
      label: this.label,
      models: this.models.map(m => m.toDto()),
      views: this.views.map(v => v.toDto()),
    };
  }
}
