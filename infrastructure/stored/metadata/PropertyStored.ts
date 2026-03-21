import { DataType, Relation } from "../../server/Property";

export type PropertyStored = {
  name: string;
  label: string;
  dataType: DataType;
  required?: boolean;
  isId?: boolean;
  relation?: Relation;
}

