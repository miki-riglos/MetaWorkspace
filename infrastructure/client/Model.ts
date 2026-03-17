import { Property } from './Property';
import { Module } from './Module';
import { ModelDto } from '../dto/ModelDto';

export class Model {
  public readonly module: Module;
  public readonly name: string;
  public readonly label: string;
  public readonly properties: Property[];

  constructor(dto: ModelDto, module: Module) {
    this.module = module;
    this.name = dto.name;
    this.label = dto.label;
    this.properties = dto.properties.map(p => new Property(p, this));
  }

  getProperty(propertyName: string): Property | undefined {
    return this.properties.find(p => p.name === propertyName);
  }

  get idProperty(): Property | undefined {
    return this.properties.find(p => p.isId);
  }
}
