import { Node } from "reactflow";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../utils/axiosClient";
import { DatabaseInfo } from "../../store/useDatabaseStore";
import { Erd, TablesGenerated, TablesSaved } from "./interfaces";
import useReactFlowStore from "../../store/useReactFlowStore";

export const useGenerateErd = () => {
  const { setEdges, setNodes } = useReactFlowStore((state) => ({
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  }));
  const { mutate: generateERD, isLoading: erdLoading } = useMutation<
    Erd,
    AxiosError,
    DatabaseInfo
  >(
    async (data) =>
      (await axiosClient.post("/database/load-erd", { id: data.id })).data,
    {
      onSuccess: async (data) => {
        console.log(data);
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
        } else if (isSavedTable(data.tables)) {
          for (const table of data.tables) {
            nodes.push({
              id: table.name,
              position: { x: table.x, y: table.y },
              type: "tableNode",
              data: { columns: table.columns, tableName: table.name },
            });
          }
        }
        setNodes(nodes);
        setEdges(data.edges);
      },
    }
  );
  return {
    generateERD,
    erdLoading,
    setNodes,
    setEdges,
  };
};

const isGeneratedTable = (
  tables: TablesGenerated | TablesSaved
): tables is TablesGenerated => {
  return true;
};

const isSavedTable = (
  tables: TablesGenerated | TablesSaved
): tables is TablesSaved => {
  return true;
};
