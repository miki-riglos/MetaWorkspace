import { ViewType } from '@/infrastructure/View';
import { Module } from './Module';
import { Model } from './Model';
import { ViewDto } from '../dto/ViewDto';
import { ViewPart } from '../ViewPart';

export class View {
  public readonly module: Module;
  public readonly name: string;
  public readonly label: string;
  public readonly viewType: ViewType;
  public readonly model: Model;
  public readonly parts: ViewPart[];
  public readonly isMenuOption: boolean;

  constructor(dto: ViewDto, module: Module) {
    this.module = module;
    this.name = dto.name;
    this.label = dto.label;
    this.viewType = dto.viewType;
    this.model = module.getModel(dto.modelName)!;
    this.parts = dto.parts;
    this.isMenuOption = dto.isMenuOption;
  }
}
