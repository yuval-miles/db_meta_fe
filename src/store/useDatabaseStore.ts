import create from "zustand";

export interface DatabaseInfo {
  id: string;
  database: string;
  host: string;
  port: string;
}

interface DatabaseStore {
  databaseStore: {
    databases: DatabaseInfo[];
    selectedDatabase: DatabaseInfo | null;
  };
  setDatabases: (databases: DatabaseInfo[]) => void;
  setSelectedDatabase: (database: DatabaseInfo) => void;
  addDatabase: (database: DatabaseInfo) => void;
  clearDatabases: () => void;
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  databaseStore: { databases: [], selectedDatabase: null },
  setDatabases: (databases) =>
    set((state) => ({
      ...state,
      databaseStore: { ...state.databaseStore, databases },
    })),
  setSelectedDatabase: (database) =>
    set((state) => ({
      ...state,
      databaseStore: { ...state.databaseStore, selectedDatabase: database },
    })),
  addDatabase: (database) =>
    set((state) => ({
      ...state,
      databaseStore: {
        ...state.databaseStore,
        databases: [...state.databaseStore.databases, database],
      },
    })),
  clearDatabases: () =>
    set((state) => ({
      ...state,
      databaseStore: { databases: [], selectedDatabase: null },
    })),
}));
