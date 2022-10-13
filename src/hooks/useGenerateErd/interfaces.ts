export interface Column {
  columnName: string;
  charLength: string;
  dataType: string;
  isNullable: string;
  isPrimaryKey: string;
  isForeignKey: string;
}

export interface Relation {
  COLUMN_NAME: string;
  REFERENCED_COLUMN_NAME: string;
  REFERENCED_TABLE_NAME: string;
  TABLE_NAME: string;
}

export interface Tables {
  [key: string]: Column[];
}

export interface ErdInfo {
  relations: Relation[];
  tables: Tables;
}
