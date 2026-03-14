import { Property, PropertyRecord } from './Property';
import { ModelConfig } from '../client-metadata/Model';

export interface ModelRecord {
  name: string;
  label: string;
  properties: PropertyRecord[];
}

export class Model {
  public readonly name: string;
  public readonly label: string;
  public readonly properties: Property[];

  constructor(record: ModelRecord) {
    this.name = record.name;
    this.label = record.label;
    this.properties = record.properties.map(p => new Property(p));
  }

  getProperty(name: string): Property | undefined {
    return this.properties.find(p => p.name === name);
  }

  get idProperty(): Property | undefined {
    return this.properties.find(p => p.isId);
  }

  toClientConfig(): ModelConfig {
    return {
      name: this.name,
      label: this.label,
      properties: this.properties.map(p => p.toClientConfig()),
    };
  }
}
