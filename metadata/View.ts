import { ViewInit as ClientViewInit } from '../client-metadata/View';

export type ViewType = 'LIST' | 'DETAIL';

export interface ViewPartConfig {
  id: string;
  component: string;
  props?: Record<string, any>;
  children?: ViewPartConfig[];
  propertyName?: string; // For detail views, which property this part binds to
}

export interface ViewInit {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPartConfig[];
  isMenuOption: boolean;
}

export interface ViewStub {
  name: string;
  label: string;
  viewType: ViewType;
}

export class View {
  public readonly name: string;
  public readonly label: string;
  public readonly viewType: ViewType;
  public readonly modelName: string;
  public readonly parts: ViewPartConfig[];
  public readonly isMenuOption: boolean;

  constructor(config: ViewInit) {
    this.name = config.name;
    this.label = config.label;
    this.viewType = config.viewType;
    this.modelName = config.modelName;
    this.parts = config.parts;
    this.isMenuOption = config.isMenuOption;
  }

  toStub(): ViewStub {
    return {
      name: this.name,
      label: this.label,
      viewType: this.viewType,
    };
  }

  toClientConfig(): ClientViewInit {
    return {
      name: this.name,
      label: this.label,
      viewType: this.viewType,
      modelName: this.modelName,
      parts: this.parts,
      isMenuOption: this.isMenuOption,
    };
  }
}
