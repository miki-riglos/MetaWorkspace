import { PropertyConfig } from '../client-metadata/Property';

export type Cardinality = 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_ONE' | 'MANY_TO_MANY';

export type DataType = 'string' | 'number' | 'boolean' | 'date' | 'relation';

export interface Relation {
  targetModel: string;
  cardinality: Cardinality;
}

export interface PropertyRecord {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
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

  constructor(record: PropertyRecord) {
    this.name = record.name;
    this.label = record.label;
    this.dataType = record.dataType;
    this.required = !!record.required;
    this.isId = !!record.isId;
    this.relation = record.relation;
  }

  toClientConfig(): PropertyConfig {
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
