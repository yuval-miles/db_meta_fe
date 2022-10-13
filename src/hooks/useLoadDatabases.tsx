import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../utils/axiosClient";
import { DatabaseInfo, useDatabaseStore } from "../store/useDatabaseStore";
import { useGenerateErd } from "./useGenerateErd/useGenerateErd";
import { useEffect } from "react";

export const useLoadDatabases = () => {
  const { setDatabases, selectedDatabase, setSelectedDatabase } =
    useDatabaseStore((state) => ({
      setDatabases: state.setDatabases,
      setSelectedDatabase: state.setSelectedDatabase,
      selectedDatabase: state.databaseStore.selectedDatabase,
    }));
  const {
    generateERD,
    erdLoading,
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  } = useGenerateErd();
  const { refetch: refetchDatabases } = useQuery<DatabaseInfo[], AxiosError>(
    ["databases"],
    async () => (await axiosClient.get("/user/get-databases")).data,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (!data.length) return;
        setDatabases(data);
        setSelectedDatabase(data[0]);
      },
    }
  );
  useEffect(() => {
    if (selectedDatabase) generateERD(selectedDatabase);
  }, [selectedDatabase]);
  return {
    refetchDatabases,
    erdLoading,
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  };
};
