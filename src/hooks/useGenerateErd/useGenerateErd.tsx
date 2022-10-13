import { useEdgesState, useNodesState, Node, Edge } from "reactflow";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../utils/axiosClient";
import { DatabaseInfo } from "../../store/useDatabaseStore";
import ELK from "elkjs";
import { ErdInfo } from "./interfaces";
const elk = new ELK();

export const useGenerateErd = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { mutate: generateERD, isLoading: erdLoading } = useMutation<
    ErdInfo,
    AxiosError,
    DatabaseInfo
  >(
    async (data) =>
      (await axiosClient.post("/database/generate-erd", data)).data,
    {
      onSuccess: async (data) => {
        console.log(data);
        const layout = await createLayout(data);
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        if (layout?.children)
          for (const table of layout.children) {
            if (table.x && table.y)
              nodes.push({
                id: table.id,
                position: { x: table.x, y: table.y },
                type: "tableNode",
                data: { columns: data.tables[table.id], tableName: table.id },
              });
          }
        for (const edge of data.relations) {
          edges.push({
            id: `${edge.REFERENCED_COLUMN_NAME}_${edge.REFERENCED_TABLE_NAME}=>${edge.COLUMN_NAME}_${edge.TABLE_NAME}`,
            source: edge.REFERENCED_TABLE_NAME,
            sourceHandle: `${edge.REFERENCED_TABLE_NAME}_${edge.REFERENCED_COLUMN_NAME}`,
            targetHandle: `${edge.TABLE_NAME}_${edge.COLUMN_NAME}`,
            target: edge.TABLE_NAME,
          });
        }
        setNodes(nodes);
        setEdges(edges);
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

const createLayout = async (erdInfo: ErdInfo) => {
  const children: { id: string; width: number; height: number }[] = [];
  const edges: { id: string; sources: string[]; targets: string[] }[] = [];
  for (const table in erdInfo.tables) {
    children.push({
      id: table,
      width: 424,
      height: 113.5 + erdInfo.tables[table].length * 57,
    });
  }
  for (const edge of erdInfo.relations) {
    const idxOfEdge = edges.findIndex(
      (el) =>
        el.id === `${edge.REFERENCED_COLUMN_NAME}_${edge.REFERENCED_TABLE_NAME}`
    );
    if (idxOfEdge)
      edges.push({
        id: `${edge.REFERENCED_COLUMN_NAME}_${edge.REFERENCED_TABLE_NAME}`,
        sources: [`${edge.REFERENCED_TABLE_NAME}`],
        targets: [`${edge.TABLE_NAME}`],
      });
    else
      edges[idxOfEdge].sources = [
        ...edges[idxOfEdge].sources,
        `${edge.REFERENCED_TABLE_NAME}`,
      ];
  }
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.separateConnectedComponents": "false",
      "spacing.nodeNode": "70",
      "spacing.nodeNodeBetweenLayers": "70",
    },
    children: children,
    edges: edges,
  };
  try {
    const layout = await elk.layout(graph);
    return layout;
  } catch (err) {
    console.log(err);
  }
};
