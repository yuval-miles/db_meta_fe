import { Edge } from "reactflow";

export interface Row {
  columnName: string;
  charLength: string;
  dataType: string;
  isNullable: string;
  isPrimaryKey: string;
  isForeignKey: string;
}

export interface Tables {
  [key: string]: Row[];
}

export interface NodeLayout {
  id: string;
  x: number;
  y: number;
}
export interface Erd {
  edges: Edge[];
  tables: Tables;
  layout: NodeLayout[];
}
