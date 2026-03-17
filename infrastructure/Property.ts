import { PropertyStored } from "./stored/PropertyStored";
import { PropertyDto } from "./dto/PropertyDto";

export type Cardinality = 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_ONE' | 'MANY_TO_MANY';

export type DataType = 'string' | 'number' | 'boolean' | 'date' | 'relation';

export type Relation = {
  targetModel: string;
  cardinality: Cardinality;
}

export class Property {
  public readonly name: string;
  public readonly label: string;
  public readonly dataType: DataType;
  public readonly required: boolean;
  public readonly isId: boolean;
  public readonly relation?: Relation;

  constructor(stored: PropertyStored) {
    this.name = stored.name;
    this.label = stored.label;
    this.dataType = stored.dataType;
    this.required = !!stored.required;
    this.isId = !!stored.isId;
    this.relation = stored.relation;
  }

  toDto(): PropertyDto {
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
