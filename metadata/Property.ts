import { PropertyConfig as ClientPropertyConfig } from '../client-metadata/Property';

export type Cardinality = 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_ONE' | 'MANY_TO_MANY';
export type DataType = 'string' | 'number' | 'boolean' | 'date' | 'relation';

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

  toClientConfig(): ClientPropertyConfig {
    return {
      name: this.name,
      label: this.label,
      dataType: this.dataType,
      required: this.required,
      isId: this.isId,
      relation: this.relation,
    };
  }
}
