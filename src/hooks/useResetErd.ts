import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DatabaseInfo } from "../store/useDatabaseStore";
import useReactFlowStore from "../store/useReactFlowStore";
import axiosClient from "../utils/axiosClient";
import { Erd, TablesGenerated, TablesSaved } from "./useGenerateErd";
import { Node } from "reactflow";

export const useResetErd = () => {
  const { setEdges, setNodes } = useReactFlowStore((state) => ({
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  }));
  const { mutate: resetErd } = useMutation<Erd, AxiosError, DatabaseInfo>(
    async (selectedDb) => {
      if (selectedDb)
        return (
          await axiosClient.post("/database/reset-erd", { id: selectedDb.id })
        ).data;
      else throw new Error("No database selected");
    },
    {
      onSuccess: (data) => {
        const nodes: Node[] = [];
        if (isGeneratedTable(data.tables) && data.layout) {
          for (const table of data.layout) {
            nodes.push({
              id: table.id,
              position: { x: table.x, y: table.y },
              type: "tableNode",
              data: {
                columns: data.tables[table.id],
                tableName: table.id,
              },
            });
          }
          setNodes(nodes);
          setEdges(data.edges);
        }
      },
    }
  );
  return { resetErd };
};
const isGeneratedTable = (
  tables: TablesGenerated | TablesSaved
): tables is TablesGenerated => {
  return true;
};
