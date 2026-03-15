import { ViewType } from '@/metadata/View';
import { Module } from './Module';
import { Model } from './Model';

export interface ViewConfig {
  name: string;
  label: string;
  viewType: ViewType;
  modelName: string;
  parts: ViewPartConfig[];
  isMenuOption: boolean;
}

export interface ViewPartConfig {
  componentName: string;
  modelName?: string;
  propertyName?: string;  // of the parent part model
  label?: string;
  children?: ViewPartConfig[];
  options?: Record<string, any>;
}

export class View {
  public readonly module: Module;
  public readonly name: string;
  public readonly label: string;
  public readonly viewType: ViewType;
  public readonly model: Model;
  public readonly parts: ViewPartConfig[];
  public readonly isMenuOption: boolean;

  constructor(config: ViewConfig, module: Module) {
    this.module = module;
    this.name = config.name;
    this.label = config.label;
    this.viewType = config.viewType;
    this.model = module.getModel(config.modelName)!;
    this.parts = config.parts;
    this.isMenuOption = config.isMenuOption;
  }
}
