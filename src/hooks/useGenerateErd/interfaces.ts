import { Edge } from "reactflow";

export interface Row {
  columnName: string;
  charLength: string;
  dataType: string;
  isNullable: string;
  isPrimaryKey: string;
  isForeignKey: string;
}

export interface TablesGenerated {
  [key: string]: Row[];
}

export type TablesSaved = {
  height: number;
  name: string;
  x: number;
  y: number;
  columns: Row[];
}[];

export interface NodeLayout {
  id: string;
  x: number;
  y: number;
}
export interface Erd {
  edges: Edge[];
  tables: TablesGenerated | TablesSaved;
  layout?: NodeLayout[];
}
