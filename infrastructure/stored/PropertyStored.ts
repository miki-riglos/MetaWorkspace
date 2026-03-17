import { DataType, Relation } from "../Property";

export type PropertyStored = {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
}

