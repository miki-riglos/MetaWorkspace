import { ViewConfig, ViewPartConfig, } from '../client-metadata/View';

export type ViewType = 'LIST' | 'DETAIL';

export interface ViewRecord {
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
  isMenuOption: boolean;
}

export class View {
  public readonly name: string;
  public readonly label: string;
  public readonly viewType: ViewType;
  public readonly modelName: string;
  public readonly parts: ViewPartConfig[];
  public readonly isMenuOption: boolean;

  constructor(record: ViewRecord) {
    this.name = record.name;
    this.label = record.label;
    this.viewType = record.viewType;
    this.modelName = record.modelName;
    this.parts = record.parts;
    this.isMenuOption = record.isMenuOption;
  }

  toStub(): ViewStub {
    return {
      name: this.name,
      label: this.label,
      viewType: this.viewType,
      isMenuOption: this.isMenuOption,
    };
  }

  toClientConfig(): ViewConfig {
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
