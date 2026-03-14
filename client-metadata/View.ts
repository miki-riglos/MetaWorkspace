import { ViewType, ViewPartConfig } from '@/metadata/View';

export interface ViewInit {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPartConfig[];
  isMenuOption: boolean;
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
}
