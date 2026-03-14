import { DataType, Relation } from '@/metadata/Property';
import { Model } from './Model';


export interface PropertyConfig {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
}

export class Property {
  public readonly model: Model;
  public readonly name: string;
  public readonly label: string;
  public readonly dataType: DataType;
  public readonly required: boolean;
  public readonly isId: boolean;
  public readonly relation?: Relation;

  constructor(config: PropertyConfig, model: Model) {
    this.model = model;
    this.name = config.name;
    this.label = config.label;
    this.dataType = config.dataType;
    this.required = !!config.required;
    this.isId = !!config.isId;
    this.relation = config.relation;
  }
}
