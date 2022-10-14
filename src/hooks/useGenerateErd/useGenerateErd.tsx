import { useEdgesState, useNodesState, Node, Edge } from "reactflow";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../utils/axiosClient";
import { DatabaseInfo } from "../../store/useDatabaseStore";
import { Erd } from "./interfaces";

export const useGenerateErd = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { mutate: generateERD, isLoading: erdLoading } = useMutation<
    Erd,
    AxiosError,
    DatabaseInfo
  >(
    async (data) =>
      (await axiosClient.post("/database/generate-erd", { id: data.id })).data,
    {
      onSuccess: async (data) => {
        console.log(data);
        const nodes: Node[] = [];
        if (data?.layout?.children)
          for (const table of data.layout.children) {
            if (table.x && table.y)
              nodes.push({
                id: table.id,
                position: { x: table.x, y: table.y },
                type: "tableNode",
                data: { columns: data.tables[table.id], tableName: table.id },
              });
          }
        setNodes(nodes);
        setEdges(data.edges);
      },
    }
  );
  return {
    generateERD,
    erdLoading,
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  };
};
