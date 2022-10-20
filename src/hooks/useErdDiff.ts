import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { AxiosError } from "axios";
import { useDatabaseStore } from "../store/useDatabaseStore";

export const useErdDiff = () => {
  const { selectedDb } = useDatabaseStore((state) => ({
    selectedDb: state.databaseStore.selectedDatabase,
  }));
  const { refetch: getErdDiff } = useQuery<any, AxiosError>(
    ["erdDiff"],
    async () => {
      if (selectedDb?.id)
        return (await axiosClient.get(`/database/compare-erd/${selectedDb.id}`))
          .data;
      else return null;
    },
    {
      refetchInterval: 1000 * 60,
      onSuccess: (data) => {
        if (data) console.log(data);
      },
    }
  );
  return { getErdDiff };
};
