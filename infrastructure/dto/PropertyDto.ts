import { DataType, Relation } from '@/infrastructure/Property';

export type PropertyDto = {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
}
