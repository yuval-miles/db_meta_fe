import { Edge } from "reactflow";

export interface Column {
  columnName: string;
  charLength: string;
  dataType: string;
  isNullable: string;
  isPrimaryKey: string;
  isForeignKey: string;
}

export interface Tables {
  [key: string]: Column[];
}

export interface NodeLayout {
  id: string;
  x: number;
  y: number;
}
export interface Layout {
  children: NodeLayout[];
}

export interface Erd {
  edges: Edge[];
  tables: Tables;
  layout: Layout;
}
