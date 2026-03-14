import { Property, PropertyConfig } from './Property';

export interface ModelConfig {
  name: string;
  label: string;
  properties: PropertyConfig[];
}

export class Model {
  public readonly name: string;
  public readonly label: string;
  public readonly properties: Property[];

  constructor(config: ModelConfig) {
    this.name = config.name;
    this.label = config.label;
    this.properties = config.properties.map(p => new Property(p));
  }

  getProperty(name: string): Property | undefined {
    return this.properties.find(p => p.name === name);
  }

  get idProperty(): Property | undefined {
    return this.properties.find(p => p.isId);
  }
}
