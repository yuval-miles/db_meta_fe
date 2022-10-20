import { useLoadDatabases } from "../hooks/useGenerateErd";
import ReactFlow, {
  Controls,
  Background,
  NodeChange,
  NodePositionChange,
} from "reactflow";
import { Box, Fade } from "@mui/material";
import "reactflow/dist/style.css";
import { LinearProgress } from "@mui/material";
import TableNode from "../Componentes/TabelNode";
import { useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSocket } from "../store/useSocket";
import { useDatabaseStore } from "../store/useDatabaseStore";
import { useErdDiff } from "../hooks/useErdDiff";
import useReactFlowStore from "../store/useReactFlowStore";

const nodeTypes = { tableNode: TableNode };

const currentNode = { x: 0, y: 0, id: "" };

const DisplayPage = () => {
  const { selectedDb } = useDatabaseStore((state) => ({
    selectedDb: state.databaseStore.selectedDatabase,
  }));
  const { setSocket, socket } = useSocket((state) => ({
    setSocket: state.setSocket,
    socket: state.socket,
  }));
  const { nodes, edges, onEdgesChange, onNodesChange } = useReactFlowStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
    })
  );
  const { erdLoading } = useLoadDatabases();
  useErdDiff();
  const onDrag = useCallback(
    (changes: NodeChange[]) => {
      if (isPositionChange(changes[0]) && changes[0].dragging) {
        currentNode.id = changes[0].id;
        currentNode.x = changes[0].position!.x;
        currentNode.y = changes[0].position!.y;
      } else if (
        isPositionChange(changes[0]) &&
        !changes[0].dragging &&
        changes[0].type === "position"
      ) {
        socket?.emit("updateNodePosition", {
          tableName: changes[0].id,
          dbId: selectedDb?.id,
          x: currentNode.x,
          y: currentNode.y,
        });
      }
      return onNodesChange(changes);
    },
    [socket, selectedDb]
  );
  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Box sx={{ width: "100%", height: "92.5vh" }}>
        <Fade in={erdLoading}>
          <LinearProgress />
        </Fade>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onDrag}
          edges={edges}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      </Box>
    </>
  );
};

const isPositionChange = (change: NodeChange): change is NodePositionChange => {
  return true;
};

export default DisplayPage;
