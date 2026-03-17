import { DataType, Relation } from '@/infrastructure/Property';
import { Model } from './Model';
import { PropertyDto } from '../dto/PropertyDto';

export class Property {
  public readonly model: Model;
  public readonly name: string;
  public readonly label: string;
  public readonly dataType: DataType;
  public readonly required: boolean;
  public readonly isId: boolean;
  public readonly relation?: Relation;

  constructor(dto: PropertyDto, model: Model) {
    this.model = model;
    this.name = dto.name;
    this.label = dto.label;
    this.dataType = dto.dataType;
    this.required = !!dto.required;
    this.isId = !!dto.isId;
    this.relation = dto.relation;
  }
}
