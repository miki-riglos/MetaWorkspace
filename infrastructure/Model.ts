import { ModelStored } from './stored/ModelStored';
import { Property } from './Property';
import { ModelDto } from './dto/ModelDto';

export class Model {
  public readonly name: string;
  public readonly label: string;
  public readonly properties: Property[];

  constructor(stored: ModelStored) {
    this.name = stored.name;
    this.label = stored.label;
    this.properties = stored.properties.map(p => new Property(p));
  }

  getProperty(name: string): Property | undefined {
    return this.properties.find(p => p.name === name);
  }

  get idProperty(): Property | undefined {
    return this.properties.find(p => p.isId);
  }

  toDto(): ModelDto {
    return {
      name: this.name,
      label: this.label,
      properties: this.properties.map(p => p.toDto()),
    };
  }
}
