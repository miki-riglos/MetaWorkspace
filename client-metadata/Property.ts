import { Cardinality, DataType } from '@/metadata/Property';

export interface PropertyConfig {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: {
    targetModel: string;
    cardinality: Cardinality;
  };
}

export class Property {
  public readonly name: string;
  public readonly label: string;
  public readonly dataType: DataType;
  public readonly required: boolean;
  public readonly isId: boolean;
  public readonly relation?: {
    targetModel: string;
    cardinality: Cardinality;
  };

  constructor(config: PropertyConfig) {
    this.name = config.name;
    this.label = config.label;
    this.dataType = config.dataType;
    this.required = !!config.required;
    this.isId = !!config.isId;
    this.relation = config.relation;
  }
}
