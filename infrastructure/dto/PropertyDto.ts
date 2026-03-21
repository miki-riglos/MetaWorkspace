import { DataType, Relation } from '@/infrastructure/server/Property';

export type PropertyDto = {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
}
