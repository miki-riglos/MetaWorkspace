import { Property, PropertyConfig } from './Property';
import { Module } from './Module';

export interface ModelConfig {
  name: string;
  label: string;
  properties: PropertyConfig[];
}

export class Model {
  public readonly module: Module;
  public readonly name: string;
  public readonly label: string;
  public readonly properties: Property[];

  constructor(config: ModelConfig, module: Module) {
    this.module = module;
    this.name = config.name;
    this.label = config.label;
    this.properties = config.properties.map(p => new Property(p, this));
  }

  getProperty(propertyName: string): Property | undefined {
    return this.properties.find(p => p.name === propertyName);
  }

  get idProperty(): Property | undefined {
    return this.properties.find(p => p.isId);
  }
}
